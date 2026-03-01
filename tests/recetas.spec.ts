import { describe, test, expect, beforeEach, afterEach, vi, MockInstance } from 'vitest';
import { SistemaRecetario } from '../src/ejercicio-3/recetas';
import { Chef, Receta, Paso } from '../src/ejercicio-3/chef'; 

describe('Sistema Recetario - Lógica y Búsquedas', () => {
  let sistema: SistemaRecetario;
  let consoleTableSpy: MockInstance;

  beforeEach(() => {
    sistema = new SistemaRecetario();
    consoleTableSpy = vi.spyOn(console, 'table').mockImplementation(() => {});
    const paso1 = new Paso("Cortar cebolla", 60, ["preparacion", "verduras"], false);
    const paso2 = new Paso("Añadir sal extra", 10, ["condimento"], true);
    const paso3 = new Paso("Batir huevos", 120, ["preparacion"], false);
    const recetaTortilla = new Receta("Tortilla", 2020, [paso1, paso3]); 
    const recetaSopa = new Receta("Sopa de cebolla", 2022, [paso1, paso2]); 
    const chef1 = new Chef("Paco", 1500, [recetaTortilla]);
    const chef2 = new Chef("Arguiñano", 5000, [recetaSopa]);

    // Añadimos los datos al sistema
    sistema.agregarChef(chef1);
    sistema.agregarChef(chef2);
  });

  afterEach(() => {
    // Restauramos los espías después de cada test para no afectar a otros
    vi.restoreAllMocks();
  });

  describe('Lógica interna de Recetas', () => {
    test('calcularNumeroDePasos debe devolver la cantidad correcta', () => {
      const receta = new Receta("Test", 2023, [new Paso("P1", 10, []), new Paso("P2", 10, [])]);
      expect(receta.calcularNumeroDePasos()).toBe(2);
    });

    test('calcularTiempoEstimado debe devolver un rango si hay pasos opcionales', () => {
      // Sopa de cebolla tiene 60s fijos y 10s opcionales
      const chef = new Chef("Test", 10, [new Receta("Sopa", 2022, [
        new Paso("P1", 60, [], false),
        new Paso("P2", 10, [], true)
      ])]);
      expect(chef.recetario[0].calcularTiempoEstimado()).toBe("Rango: 60s - 70s");
    });

    test('calcularTiempoEstimado debe devolver un tiempo fijo si no hay opcionales', () => {
      // Tortilla tiene 60s + 120s = 180s fijos
      const chef = new Chef("Test", 10, [new Receta("Tortilla", 2020, [
        new Paso("P1", 60, [], false),
        new Paso("P2", 120, [], false)
      ])]);
      expect(chef.recetario[0].calcularTiempoEstimado()).toBe("180s");
    });
  });

  describe('Búsquedas del Sistema', () => {
    test('buscarChef debe encontrar un chef por nombre (ignorando mayúsculas/minúsculas)', () => {
      sistema.buscarChef("paco");
      // Comprobamos que console.table fue llamado con el array correcto
      expect(consoleTableSpy).toHaveBeenCalledWith([
        { Nombre: "Paco", Seguidores: 1500 }
      ]);
    });

    test('buscarReceta debe encontrar una receta y mostrarla con la interfaz ResultadoReceta', () => {
      sistema.buscarReceta("Tortilla");
      expect(consoleTableSpy).toHaveBeenCalledWith([
        {
          Chef: "Paco",
          Receta: "Tortilla",
          Año: 2020,
          Tiempo: "180s"
        }
      ]);
      });

    test('buscarPaso debe encontrar pasos por nombre parcial', () => {
      sistema.buscarPaso("cebolla"); // Debería encontrar "Cortar cebolla" en la Tortilla y en la Sopa
      consoleTableSpy = vi.spyOn(console, 'table').mockImplementation(() => {}); // Reiniciamos el espía para capturar la siguiente llamada
      let consoleTableSpyCalls = consoleTableSpy.mock.calls[0][0]; // Capturamos el argumento que se le pasó a console.table
      expect(consoleTableSpyCalls.length).toBe(2);
      expect(consoleTableSpyCalls[0].Paso).toBe("Cortar cebolla");
      expect(consoleTableSpyCalls[1].Paso).toBe("Cortar cebolla");
    });

    test('buscarPaso debe encontrar pasos por etiqueta', () => {
      sistema.buscarPaso("condimento"); 
      expect(consoleTableSpy).toHaveBeenCalledWith([
        {
            Receta: "Sopa de cebolla",
            Paso: "Añadir sal extra",
            Duracion: "10s",
            Opcional: "Sí"
        }
      ]);
    });

    test('buscarPaso no debe devolver nada si el término no existe', () => {
      sistema.buscarPaso("termino_inventado");
      expect(consoleTableSpy).toHaveBeenCalledWith([]); // Array vacío
    });
  });
});