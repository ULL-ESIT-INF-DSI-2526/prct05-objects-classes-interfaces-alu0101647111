declare enum Ficha {
    VACIA = "x",
    J1 = "1",
    J2 = "2"
}
interface IJugador {
    nombre: string;
    ficha: Ficha;
}
declare class Jugador implements IJugador {
    nombre: string;
    ficha: Ficha;
    constructor(nombre: string, ficha: Ficha);
}
declare class Tablero {
    private FILAS;
    private COLUMNAS;
    private rejilla;
    constructor();
    colocarFicha(columna: number, ficha: Ficha): boolean;
    imprimir(): void;
    comprobarVictoria(ficha: Ficha): boolean;
}
declare class Conecta4 {
    private tablero;
    private jugador1;
    private jugador2;
    private turnoJ1;
    private juegoTerminado;
    constructor();
    jugarTurno(columna: number): void;
}
