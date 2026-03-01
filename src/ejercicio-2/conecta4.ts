/**
 * Enumeración para representar el estado de cada celda del tablero.
 */
export enum Ficha {
  VACIA = '-',
  J1 = '1',    
  J2 = '2'    
}

/**
 * Interfaz para representar a un jugador.
 */
export interface IJugador {
  nombre: string;
  ficha: Ficha;
}

/**
 * Clase abstracta para representar a un jugador.
 */
export class Jugador implements IJugador {
  constructor(public nombre: string, public ficha: Ficha) {}
}

/**
 * Clase para representar el tablero del juego.
 */
export class Tablero {
  private FILAS = 6;
  private COLUMNAS = 7;
  private rejilla: Ficha[][];

  constructor() {
    this.rejilla = [];
    for (let f = 0; f < this.FILAS; f++) {
        this.rejilla[f] = new Array(this.COLUMNAS).fill(Ficha.VACIA);
    }
  }

  /**
   * Funcion para colocar una ficha en la columna seleccionada.
   * @param columna - Columna donde se desea colocar la ficha 
   * @param ficha - Tipo de ficha del jugador (J1 o J2)
   * @returns 
   */
  public colocarFicha(columna: number, ficha: Ficha): boolean {
    if (columna < 0 || columna >= this.COLUMNAS) return false;

    for (let fila = this.FILAS - 1; fila >= 0; fila--) {
      if (this.rejilla[fila][columna] === Ficha.VACIA) {
        this.rejilla[fila][columna] = ficha;
        return true;
      }
    }
    return false; 
  }

  /**
   * Funcion para imprimir el estado actual del tablero en la consola, usando console.table y aprovechando la estructura de la rejilla.
   */
  public imprimir(): void {
    console.table(this.rejilla);
  }

  /**
   * Funcion para comprobar si el jugador actual ha ganado después de colocar su ficha, verificando las 4 en línea en todas las direcciones (horizontal, vertical y diagonales).
   * @param ficha - Tipo de ficha del jugador (J1 o J2) para verificar si ha ganado
   * @returns Retorna true si el jugador ha ganado, false en caso contrario
   */
  public comprobarVictoria(ficha: Ficha): boolean {
    for (let f = 0; f < this.FILAS; f++) {
      for (let c = 0; c < this.COLUMNAS - 3; c++) {
        if (this.rejilla[f][c] === ficha && this.rejilla[f][c+1] === ficha && 
          this.rejilla[f][c+2] === ficha && this.rejilla[f][c+3] === ficha) return true;
      }
    }
    for (let f = 0; f < this.FILAS - 3; f++) {
      for (let c = 0; c < this.COLUMNAS; c++) {
        if (this.rejilla[f][c] === ficha && this.rejilla[f+1][c] === ficha && 
          this.rejilla[f+2][c] === ficha && this.rejilla[f+3][c] === ficha) return true;
      }
    }
    for (let f = 0; f < this.FILAS - 3; f++) {
      for (let c = 0; c < this.COLUMNAS - 3; c++) {
        if (this.rejilla[f][c] === ficha && this.rejilla[f+1][c+1] === ficha && 
          this.rejilla[f+2][c+2] === ficha && this.rejilla[f+3][c+3] === ficha) return true;
      }
    }
    for (let f = 3; f < this.FILAS; f++) {
      for (let c = 0; c < this.COLUMNAS - 3; c++) {
        if (this.rejilla[f][c] === ficha && this.rejilla[f-1][c+1] === ficha && 
          this.rejilla[f-2][c+2] === ficha && this.rejilla[f-3][c+3] === ficha) return true;
      }
    }
    return false;
  }
}

/**
 * Clase principal para manejar el desarrollo del juego, controlando los turnos de los jugadores, la interacción con el tablero y la detección de victoria.
 */
export class Conecta4 {
  private tablero: Tablero;
  private jugador1: Jugador;
  private jugador2: Jugador;
  private turnoJ1: boolean; 
  private juegoTerminado: boolean;

  constructor() {
    this.tablero = new Tablero();
    this.jugador1 = new Jugador("Jugador 1", Ficha.J1);
    this.jugador2 = new Jugador("Jugador 2", Ficha.J2);
    this.turnoJ1 = true;
    this.juegoTerminado = false;
    
    console.log("¡Bienvenido a Conecta 4!");
    this.tablero.imprimir();
  }

  /**
   * Funcion para manejar el turno de cada jugador, solicitando la columna donde desea colocar su ficha, actualizando el tablero y verificando si ha ganado después de cada movimiento.
   * @param columna - se recibe la columna seleccionada por el jugador para colocar su ficha
   * @returns Nada
   */
  public jugarTurno(columna: number): void {
    if (this.juegoTerminado) {
      console.log("El juego ha terminado.");
      return;
    }
    const jugadorActual = this.turnoJ1 ? this.jugador1 : this.jugador2;
    console.log(`\nTurno de ${jugadorActual.nombre} (${jugadorActual.ficha})`);
    const exito = this.tablero.colocarFicha(columna, jugadorActual.ficha);

    if (!exito) {
      console.log(` Columna llena o inválida. Intenta de nuevo.`);
      return; 
    }
    this.tablero.imprimir();
    if (this.tablero.comprobarVictoria(jugadorActual.ficha)) {
      console.log(`¡GANADOR: ${jugadorActual.nombre.toUpperCase()}!`);
      this.juegoTerminado = true;
      return;
    }
    this.turnoJ1 = !this.turnoJ1;
  }
}