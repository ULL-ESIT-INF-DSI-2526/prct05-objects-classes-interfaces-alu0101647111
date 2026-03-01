

/**
 * Estructura exacta que tendrá la fila de la tabla para mostrar
 */
export interface FilaTabla {
  Tipo: string;
  Título: string;
  Autores: string;
  Año: number;
  Editorial: string;
}


/**
 * Clase abstracta para representar un elemento bibliográfico, con sus propiedades comunes y un método abstracto para obtener su formato IEEE.
 */
export abstract class ElementoBibliografico {
  constructor(
    public titulo: string,
    public autores: string[],
    public palabrasClave: string[],
    public resumen: string,
    public fechaPublicacion: number, 
    public paginas: string,
    public editorial: string
  ) {}

  // Cada subclase estará obligada a implementar su propio formato IEEE
  abstract getFormatoIEEE(): string;

  public toTableRow(): FilaTabla {
    return {
        Tipo: this.constructor.name,
        Título: this.titulo,
        Autores: this.autores.join(", "),
        Año: this.fechaPublicacion,
        Editorial: this.editorial
    };
  }
}


/**
 * Subclase para representar un artículo de revista, con sus propiedades específicas y su formato IEEE.
 */
export class ArticuloRevista extends ElementoBibliografico {
  constructor(
    titulo: string, autores: string[], palabrasClave: string[], resumen: string, 
    fechaPublicacion: number, paginas: string, editorial: string,
    public nombreRevista: string,
    public volumen: number,
    public numero: number
  ) {
    super(titulo, autores, palabrasClave, resumen, fechaPublicacion, paginas, editorial);
  }

  getFormatoIEEE(): string {
    return `${this.autores.join(", ")}, "${this.titulo}," ${this.nombreRevista}, vol. ${this.volumen}, no. ${this.numero}, pp. ${this.paginas}, ${this.fechaPublicacion}.`;
  }
}

/**
 * Subclase para representar un capítulo de libro, con sus propiedades específicas y su formato IEEE.
 */
export class CapituloLibro extends ElementoBibliografico {
  constructor(
    titulo: string, autores: string[], palabrasClave: string[], resumen: string, 
    fechaPublicacion: number, paginas: string, editorial: string,
    public tituloLibro: string
  ) {
      super(titulo, autores, palabrasClave, resumen, fechaPublicacion, paginas, editorial);
  }

  getFormatoIEEE(): string {
    return `${this.autores.join(", ")}, "${this.titulo}," in ${this.tituloLibro}, ${this.editorial}, ${this.fechaPublicacion}, pp. ${this.paginas}.`;
  }
}

/**
 * Subclase para representar un trabajo académico, con sus propiedades específicas y su formato IEEE.
 */
export class TrabajoAcademico extends ElementoBibliografico {
  constructor(
    titulo: string, autores: string[], palabrasClave: string[], resumen: string, 
    fechaPublicacion: number, paginas: string, editorial: string,
    public universidad: string,
    public tipoTrabajo: 'Trabajo de Fin de Grado' | 'Trabajo de Fin de Máster' | 'Tesis Doctoral'
  ) {
    super(titulo, autores, palabrasClave, resumen, fechaPublicacion, paginas, editorial);
  }

  getFormatoIEEE(): string {
    return `${this.autores.join(", ")}, "${this.titulo}," ${this.tipoTrabajo}, ${this.universidad}, ${this.fechaPublicacion}.`;
  }
}



/**
 * Interfaz para definir los criterios de filtrado en el gestor bibliográfico, con propiedades opcionales para cada criterio.
 */
export interface CriteriosFiltro {
  titulo?: string;
  autor?: string;
  fechaPublicacion?: number;
  editorial?: string;
}

/**
 * Clase princial para gestionar una colección de elementos bibliográficos, con métodos para agregar, mostrar, buscar, filtrar y exportar los elementos.
 */
export class GestorBibliografico {
  private elementos: ElementoBibliografico[] = [];

  public agregarElemento(elemento: ElementoBibliografico): void {
    this.elementos.push(elemento);
  }

  public mostrarTodos(): void {
    console.log("TODOS LOS ELEMENTOS BIBLIOGRÁFICOS");
    console.table(this.elementos.map(e => e.toTableRow()));
  }

  /**
   * Función para buscar elementos bibliográficos por palabras clave, mostrando los resultados en una tabla y devolviendo el array de resultados.
   * @param palabra - Palabra clave a buscar (se buscará en el array de palabrasClave de cada elemento
   * @returns Tabla con los resultados de la búsqueda y array de elementos que coinciden con la palabra clave
   */
  public buscarPorPalabrasClave(palabra: string): ElementoBibliografico[] {
    const palabraLower = palabra.toLowerCase();
    const resultados = this.elementos.filter(e => 
      e.palabrasClave.some(pc => pc.toLowerCase().includes(palabraLower))
    );
    
    console.log(`\nBÚSQUEDA POR PALABRA CLAVE: '${palabra}'\n`);
    console.table(resultados.map(e => e.toTableRow()));
    return resultados;
  }


  /**
   * Función para filtrar elementos bibliográficos por múltiples criterios (título, autor, fecha de publicación y editorial), mostrando los resultados en una tabla y devolviendo el array de resultados.
   * @param criterios - Criterios de filtrado
   * @returns Array de elementos que coinciden con los criterios de filtrado
   */
  public filtrar(criterios: CriteriosFiltro): ElementoBibliografico[] {
    const resultados = this.elementos.filter(e => {
      let coincide = true;
      if (criterios.titulo && !e.titulo.toLowerCase().includes(criterios.titulo.toLowerCase())) coincide = false;
      if (criterios.autor && !e.autores.some(a => a.toLowerCase().includes(criterios.autor!.toLowerCase()))) coincide = false;
      if (criterios.fechaPublicacion && e.fechaPublicacion !== criterios.fechaPublicacion) coincide = false;
      if (criterios.editorial && !e.editorial.toLowerCase().includes(criterios.editorial.toLowerCase())) coincide = false;
      return coincide;
    });

    console.log("\nRESULTADOS DEL FILTRADO ");
    console.table(resultados.map(e => e.toTableRow()));
    return resultados;
  }

  /**
   * Función para exportar los elementos bibliográficos en formato IEEE, mostrando cada elemento con su formato específico. Si se proporcionan elementos como argumento, se exportarán esos elementos; si no, se exportarán todos los elementos del gestor.
   * @param elementos - Array de elementos a exportar (opcional). Si no se proporciona, se exportarán todos los elementos del gestor.
   */
  public exportarIEEE(elementos: ElementoBibliografico[] = this.elementos): void {
    console.log("\nEXPORTACIÓN EN FORMATO IEEE ");
    elementos.forEach((e, index) => {
      console.log(`[${index + 1}] ${e.getFormatoIEEE()}`);
    });
  }
}