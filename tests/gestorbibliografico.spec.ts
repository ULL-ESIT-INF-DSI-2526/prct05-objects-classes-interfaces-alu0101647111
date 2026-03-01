import { describe, test, expect, beforeEach, vi } from 'vitest';
import { GestorBibliografico, ArticuloRevista, CapituloLibro, TrabajoAcademico } from '../src/ejercicio-1/gestorbibliografico'; // Cambia './gestor' por el nombre real de tu archivo

describe('Elementos Bibliográficos - Formato IEEE', () => {
    test('ArticuloRevista debe generar el formato IEEE correctamente', () => {
        const articulo = new ArticuloRevista(
            "A survey of machine learning", ["J. Qiu", "Q. Wu"], ["ml", "ai"], 
            "Resumen", 2016, "67-97", "EURASIP", "EURASIP Journal", 2016, 1
        );
        const expected = `J. Qiu, Q. Wu, "A survey of machine learning," EURASIP Journal, vol. 2016, no. 1, pp. 67-97, 2016.`;
        expect(articulo.getFormatoIEEE()).toBe(expected);
    });

    test('CapituloLibro debe generar el formato IEEE correctamente', () => {
        const capitulo = new CapituloLibro(
            "Introducción a TypeScript", ["A. Pérez"], ["ts", "js"], 
            "Resumen TS", 2023, "15-45", "TechBooks", "Desarrollo Web"
        );
        const expected = `A. Pérez, "Introducción a TypeScript," in Desarrollo Web, TechBooks, 2023, pp. 15-45.`;
        expect(capitulo.getFormatoIEEE()).toBe(expected);
    });

    test('TrabajoAcademico debe generar el formato IEEE correctamente', () => {
        const tfg = new TrabajoAcademico(
            "App de biblioteca", ["L. Rodríguez"], ["web"], 
            "Resumen TFG", 2022, "1-80", "ULL", "Universidad de La Laguna", "Trabajo de Fin de Grado"
        );
        const expected = `L. Rodríguez, "App de biblioteca," Trabajo de Fin de Grado, Universidad de La Laguna, 2022.`;
        expect(tfg.getFormatoIEEE()).toBe(expected);
    });
});

describe('GestorBibliografico - Búsqueda y Filtrado', () => {
    let gestor: GestorBibliografico;
    let articulo: ArticuloRevista;
    let capitulo: CapituloLibro;
    let tfg: TrabajoAcademico;

    // beforeEach se ejecuta antes de cada test para darnos un entorno limpio
    beforeEach(() => {
        gestor = new GestorBibliografico();
        
        articulo = new ArticuloRevista(
            "Machine Learning Avanzado", ["J. Qiu", "Q. Wu"], ["ml", "ai", "data"], 
            "Resumen 1", 2016, "1-10", "Editorial A", "Revista AI", 1, 1
        );
        capitulo = new CapituloLibro(
            "Aprende TypeScript", ["A. Pérez", "M. García"], ["typescript", "programacion"], 
            "Resumen 2", 2023, "10-20", "TechBooks", "Libro JS"
        );
        tfg = new TrabajoAcademico(
            "Gestión de datos con IA", ["L. Rodríguez"], ["ia", "datos", "typescript"], 
            "Resumen 3", 2023, "1-50", "ULL", "Universidad X", "Trabajo de Fin de Grado"
        );

        gestor.agregarElemento(articulo);
        gestor.agregarElemento(capitulo);
        gestor.agregarElemento(tfg);

        // Silenciamos los console.log y console.table durante los tests para no ensuciar la terminal
        vi.spyOn(console, 'log').mockImplementation(() => {});
        vi.spyOn(console, 'table').mockImplementation(() => {});
    });

    test('buscarPorPalabrasClave debe encontrar elementos sin importar mayúsculas', () => {
        const resultadosTS = gestor.buscarPorPalabrasClave("TypeScript");
        expect(resultadosTS.length).toBe(2);
        expect(resultadosTS).toContain(capitulo);
        expect(resultadosTS).toContain(tfg);

        const resultadosML = gestor.buscarPorPalabrasClave("ML");
        expect(resultadosML.length).toBe(1);
        expect(resultadosML).toContain(articulo);
    });

    test('buscarPorPalabrasClave debe devolver array vacío si no hay coincidencias', () => {
        const resultados = gestor.buscarPorPalabrasClave("palabrainventada");
        expect(resultados.length).toBe(0);
    });

    test('filtrar debe funcionar por título parcial', () => {
        const resultados = gestor.filtrar({ titulo: "Aprende" });
        expect(resultados.length).toBe(1);
        expect(resultados[0].titulo).toBe("Aprende TypeScript");
    });

    test('filtrar debe funcionar por autor parcial', () => {
        const resultados = gestor.filtrar({ autor: "García" });
        expect(resultados.length).toBe(1);
        expect(resultados[0]).toBe(capitulo);
    });

    test('filtrar debe funcionar por año exacto', () => {
        const resultados = gestor.filtrar({ fechaPublicacion: 2023 });
        expect(resultados.length).toBe(2);
        expect(resultados).toContain(capitulo);
        expect(resultados).toContain(tfg);
    });

    test('filtrar debe poder combinar múltiples criterios', () => {
        const resultados = gestor.filtrar({ fechaPublicacion: 2023, editorial: "ULL" });
        expect(resultados.length).toBe(1);
        expect(resultados[0]).toBe(tfg);
    });
});