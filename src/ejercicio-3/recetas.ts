
import { Chef } from "./chef";

/**
 * Interfaz para representar el resultado de una búsqueda de receta, con el nombre del chef, el nombre de la receta, el año de publicación y el tiempo estimado de preparación.
 */
export interface ResultadoReceta {
  Chef: string;
  Receta: string;
  Año: number;
  Tiempo: string;
}

/**
 * Interfaz para representar el resultado de una búsqueda de paso, con el nombre de la receta, el nombre del paso, la duración y si es opcional o no.
 */
export interface ResultadoPaso {
  Receta: string;
  Paso: string;
  Duracion: string;
  Opcional: string;
}


/**
 * Clase principal para representar el sistema de recetario, con métodos para agregar chefs, mostrar información y realizar búsquedas.
 */
export class SistemaRecetario {
  private chefs: Chef[] = [];

  public agregarChef(chef: Chef): void {
    this.chefs.push(chef);
  }

  /**
   * Función para mostrar toda la información de los chefs, sus recetas y pasos en la consola, utilizando console.table para una presentación clara y organizada.
   */
  public mostrarTodo(): void {
    console.log("=== LISTA DE CHEFS ===");
    const chefsData = this.chefs.map(c => ({
      Nombre: c.nombre,
      Seguidores: c.seguidores,
      TotalRecetas: c.recetario.length
    }));
    console.table(chefsData);

    for (const chef of this.chefs) {
      console.log(`\n=== RECETARIO DE: ${chef.nombre.toUpperCase()} ===`);
      const recetasData = chef.recetario.map(r => ({
        Receta: r.nombre,
        Año: r.anoPublicacion,
        Pasos: r.calcularNumeroDePasos(),
        TiempoEstimado: r.calcularTiempoEstimado()
      }));
      console.table(recetasData);
      
      for (const receta of chef.recetario) {
          console.log(`Pasos para: ${receta.nombre}`);
          console.table(receta.pasos, ["nombre", "duracionSegundos", "esOpcional", "etiquetas"]);
      }
    }
  }

  /**
   * Función para buscar chefs por nombre, mostrando los resultados en una tabla con el nombre del chef y su número de seguidores.
   * @param nombre - Nombre del chef a buscar
   */
  public buscarChef(nombre: string): void {
    console.log(`\n--- Resultados de búsqueda Chef: '${nombre}' ---`);
    const resultados = this.chefs.filter(c => c.nombre.toLowerCase().includes(nombre.toLowerCase()));
    console.table(resultados.map(c => ({ Nombre: c.nombre, Seguidores: c.seguidores })));
  }

  /**
   * Funcion para buscar recetas por nombre, mostrando los resultados en una tabla con el nombre del chef, el nombre de la receta, el año de publicación y el tiempo estimado de preparación.
   * @param nombre - Nombre de la receta a buscar
   */
  public buscarReceta(nombre: string): void {
    console.log(`\n--- Resultados de búsqueda Receta: '${nombre}' ---`);
    const resultados: ResultadoReceta[] = [];
    for (const chef of this.chefs) {
      for (const receta of chef.recetario) {
        if (receta.nombre.toLowerCase().includes(nombre.toLowerCase())) {
          resultados.push({
            Chef: chef.nombre,
            Receta: receta.nombre,
            Año: receta.anoPublicacion,
            Tiempo: receta.calcularTiempoEstimado()
          });
        }
      }
    }
    console.table(resultados);
  }

  /**
   * Funcion para buscar pasos por nombre o por etiquetas, mostrando los resultados en una tabla con el nombre de la receta, el nombre del paso, la duración y si es opcional o no.
   * @param termino - termino a buscar en el nombre del paso o en sus etiquetas
   */
  public buscarPaso(termino: string): void {
    console.log(`\n--- Resultados de búsqueda Pasos: '${termino}' ---`);
    const resultados: ResultadoPaso[] = [];
    const terminoLower = termino.toLowerCase();
    for (const chef of this.chefs) {
      for (const receta of chef.recetario) {
        for (const paso of receta.pasos) {
          const coincideNombre = paso.nombre.toLowerCase().includes(terminoLower);
          const coincideEtiqueta = paso.etiquetas.some(e => e.toLowerCase().includes(terminoLower));
          if (coincideNombre || coincideEtiqueta) {
            resultados.push({
              Receta: receta.nombre,
              Paso: paso.nombre,
              Duracion: `${paso.duracionSegundos}s`,
              Opcional: paso.esOpcional ? "Sí" : "No"
            });
          }
        }
      }
    }
    console.table(resultados);
  }
}