"use strict";
var Ficha;
(function (Ficha) {
    Ficha["VACIA"] = "x";
    Ficha["J1"] = "1";
    Ficha["J2"] = "2";
})(Ficha || (Ficha = {}));
class Jugador {
    nombre;
    ficha;
    constructor(nombre, ficha) {
        this.nombre = nombre;
        this.ficha = ficha;
    }
}
class Tablero {
    FILAS = 6;
    COLUMNAS = 7;
    rejilla;
    constructor() {
        this.rejilla = [];
        for (let f = 0; f < this.FILAS; f++) {
            this.rejilla[f] = new Array(this.COLUMNAS).fill(Ficha.VACIA);
        }
    }
    colocarFicha(columna, ficha) {
        if (columna < 0 || columna >= this.COLUMNAS)
            return false;
        for (let fila = this.FILAS - 1; fila >= 0; fila--) {
            if (this.rejilla[fila][columna] === Ficha.VACIA) {
                this.rejilla[fila][columna] = ficha;
                return true;
            }
        }
        return false;
    }
    imprimir() {
        console.table(this.rejilla);
    }
    comprobarVictoria(ficha) {
        for (let f = 0; f < this.FILAS; f++) {
            for (let c = 0; c < this.COLUMNAS - 3; c++) {
                if (this.rejilla[f][c] === ficha && this.rejilla[f][c + 1] === ficha &&
                    this.rejilla[f][c + 2] === ficha && this.rejilla[f][c + 3] === ficha)
                    return true;
            }
        }
        for (let f = 0; f < this.FILAS - 3; f++) {
            for (let c = 0; c < this.COLUMNAS; c++) {
                if (this.rejilla[f][c] === ficha && this.rejilla[f + 1][c] === ficha &&
                    this.rejilla[f + 2][c] === ficha && this.rejilla[f + 3][c] === ficha)
                    return true;
            }
        }
        for (let f = 0; f < this.FILAS - 3; f++) {
            for (let c = 0; c < this.COLUMNAS - 3; c++) {
                if (this.rejilla[f][c] === ficha && this.rejilla[f + 1][c + 1] === ficha &&
                    this.rejilla[f + 2][c + 2] === ficha && this.rejilla[f + 3][c + 3] === ficha)
                    return true;
            }
        }
        for (let f = 3; f < this.FILAS; f++) {
            for (let c = 0; c < this.COLUMNAS - 3; c++) {
                if (this.rejilla[f][c] === ficha && this.rejilla[f - 1][c + 1] === ficha &&
                    this.rejilla[f - 2][c + 2] === ficha && this.rejilla[f - 3][c + 3] === ficha)
                    return true;
            }
        }
        return false;
    }
}
class Conecta4 {
    tablero;
    jugador1;
    jugador2;
    turnoJ1;
    juegoTerminado;
    constructor() {
        this.tablero = new Tablero();
        this.jugador1 = new Jugador("Jugador 1", Ficha.J1);
        this.jugador2 = new Jugador("Jugador 2", Ficha.J2);
        this.turnoJ1 = true;
        this.juegoTerminado = false;
        console.log("¡Bienvenido a Conecta 4!");
        this.tablero.imprimir();
    }
    jugarTurno(columna) {
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
            console.log(`🏆 ¡GANADOR: ${jugadorActual.nombre.toUpperCase()}! 🏆`);
            this.juegoTerminado = true;
            return;
        }
        this.turnoJ1 = !this.turnoJ1;
    }
}
//# sourceMappingURL=conecta4.js.map