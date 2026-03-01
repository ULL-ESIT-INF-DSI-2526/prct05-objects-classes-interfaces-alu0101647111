/**
 * Interfaz para un paso
 */
export interface IPaso {
  nombre: string;
  duracionSegundos: number;
  etiquetas: string[];
  esOpcional: boolean;
  vecesCompletado: number;
}

/**
 * Interfaz para una receta
 */
export interface IReceta {
  nombre: string;
  anoPublicacion: number;
  pasos: IPaso[];
}

/**
 * Interfaz para representar a un chef, con su nombre, número de seguidores y su recetario (lista de recetas).
 */
export interface IChef {
  nombre: string;
  seguidores: number;
  recetario: IReceta[];
}

/**
 * Clase para representar un paso de una receta, con sus propiedades y un constructor para inicializarlas.
 */
export class Paso implements IPaso {
  constructor(
      public nombre: string,
      public duracionSegundos: number,
      public etiquetas: string[],
      public esOpcional: boolean = false,
      public vecesCompletado: number = 0
  ) {}
}

/**
 * Clase para representar una receta, con sus propiedades, un constructor para inicializarlas y métodos para calcular el número de pasos y el tiempo estimado de preparación.
 */
export class Receta implements IReceta {
  constructor(
    public nombre: string,
    public anoPublicacion: number,
    public pasos: Paso[] = []
  ) {}

  /**
   * Función para calcular el número total de pasos de la receta, contando tanto los obligatorios como los opcionales.
   * @returns - Número total de pasos de la receta
   */
  public calcularNumeroDePasos(): number {
    return this.pasos.length;
  }

  /**
   *  Función para calcular el tiempo estimado de preparación de la receta, sumando la duración de todos los pasos y considerando un rango si hay pasos opcionales.
   * @returns - Tiempo estimado de preparación en formato string, indicando el rango si hay pasos opcionales o el tiempo total si no los hay.
   */
  public calcularTiempoEstimado(): string {
    let tiempoMinimo = 0;
    let tiempoMaximo = 0;
    for (const paso of this.pasos) {
      tiempoMaximo += paso.duracionSegundos;
      if (!paso.esOpcional) {
        tiempoMinimo += paso.duracionSegundos;
      }
    }

    if (tiempoMinimo === tiempoMaximo) {
      return `${tiempoMaximo}s`;
    } else {
      return `Rango: ${tiempoMinimo}s - ${tiempoMaximo}s`;
    }
  }
}

export class Chef implements IChef {
  constructor(
    public nombre: string,
    public seguidores: number,
    public recetario: Receta[] = []
  ) {}
}