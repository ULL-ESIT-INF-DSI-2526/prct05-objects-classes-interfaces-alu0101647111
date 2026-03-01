/**
 * Enumeración para representar el estado de cada celda del tablero.
 */
export declare enum Ficha {
    VACIA = "-",
    J1 = "1",
    J2 = "2"
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
export declare class Jugador implements IJugador {
    nombre: string;
    ficha: Ficha;
    constructor(nombre: string, ficha: Ficha);
}
/**
 * Clase para representar el tablero del juego.
 */
export declare class Tablero {
    private FILAS;
    private COLUMNAS;
    private rejilla;
    constructor();
    /**
     * Funcion para colocar una ficha en la columna seleccionada.
     * @param columna - Columna donde se desea colocar la ficha
     * @param ficha - Tipo de ficha del jugador (J1 o J2)
     * @returns
     */
    colocarFicha(columna: number, ficha: Ficha): boolean;
    /**
     * Funcion para imprimir el estado actual del tablero en la consola, usando console.table y aprovechando la estructura de la rejilla.
     */
    imprimir(): void;
    /**
     * Funcion para comprobar si el jugador actual ha ganado después de colocar su ficha, verificando las 4 en línea en todas las direcciones (horizontal, vertical y diagonales).
     * @param ficha - Tipo de ficha del jugador (J1 o J2) para verificar si ha ganado
     * @returns Retorna true si el jugador ha ganado, false en caso contrario
     */
    comprobarVictoria(ficha: Ficha): boolean;
}
/**
 * Clase principal para manejar el desarrollo del juego, controlando los turnos de los jugadores, la interacción con el tablero y la detección de victoria.
 */
export declare class Conecta4 {
    private tablero;
    private jugador1;
    private jugador2;
    private turnoJ1;
    private juegoTerminado;
    constructor();
    /**
     * Funcion para manejar el turno de cada jugador, solicitando la columna donde desea colocar su ficha, actualizando el tablero y verificando si ha ganado después de cada movimiento.
     * @param columna - se recibe la columna seleccionada por el jugador para colocar su ficha
     * @returns Nada
     */
    jugarTurno(columna: number): void;
}
