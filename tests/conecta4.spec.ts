import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Ficha, Tablero, Conecta4 } from '../src/ejercicio-2/conecta4'; // Ajusta la ruta a tu archivo

describe('Clase Tablero', () => {
  let tablero: Tablero;

  beforeEach(() => {
    tablero = new Tablero();
  });

  describe('Colocación de fichas', () => {
    it('debería colocar una ficha correctamente en una columna vacía', () => {
      const exito = tablero.colocarFicha(0, Ficha.J1);
      expect(exito).toBe(true);
    });

    it('no debería permitir colocar una ficha en una columna fuera de los límites', () => {
      expect(tablero.colocarFicha(-1, Ficha.J1)).toBe(false);
      expect(tablero.colocarFicha(7, Ficha.J1)).toBe(false);
    });

    it('no debería permitir colocar una ficha si la columna está llena', () => {
      // Llenamos la columna 0 (tiene 6 filas)
      for (let i = 0; i < 6; i++) {
        tablero.colocarFicha(0, Ficha.J1);
      }
      // Intentamos colocar una séptima ficha
      const exito = tablero.colocarFicha(0, Ficha.J2);
      expect(exito).toBe(false);
    });
  });

  describe('Comprobación de victoria', () => {
    it('debería detectar una victoria vertical', () => {
      tablero.colocarFicha(0, Ficha.J1);
      tablero.colocarFicha(0, Ficha.J1);
      tablero.colocarFicha(0, Ficha.J1);
      tablero.colocarFicha(0, Ficha.J1);
      
      expect(tablero.comprobarVictoria(Ficha.J1)).toBe(true);
      expect(tablero.comprobarVictoria(Ficha.J2)).toBe(false);
    });

    it('debería detectar una victoria horizontal', () => {
      tablero.colocarFicha(0, Ficha.J2);
      tablero.colocarFicha(1, Ficha.J2);
      tablero.colocarFicha(2, Ficha.J2);
      tablero.colocarFicha(3, Ficha.J2);
      
      expect(tablero.comprobarVictoria(Ficha.J2)).toBe(true);
    });

    it('debería detectar una victoria diagonal (de arriba-izquierda a abajo-derecha)', () => {
      tablero.colocarFicha(0, Ficha.J2); 
      tablero.colocarFicha(0, Ficha.J2); 
      tablero.colocarFicha(0, Ficha.J2); 
      tablero.colocarFicha(0, Ficha.J1); 
      tablero.colocarFicha(1, Ficha.J2);
      tablero.colocarFicha(1, Ficha.J2);
      tablero.colocarFicha(1, Ficha.J1); 
      tablero.colocarFicha(2, Ficha.J2);
      tablero.colocarFicha(2, Ficha.J1); 
      tablero.colocarFicha(3, Ficha.J1); 

      expect(tablero.comprobarVictoria(Ficha.J1)).toBe(true);
    });
  });
});

describe('Clase Conecta4 (Flujo de juego)', () => {
  let consoleLogSpy: unknown;

  beforeEach(() => {
    // Silenciamos la consola para que las pruebas no ensucien la terminal
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    //const consoleTableSpy = vi.spyOn(console, 'table').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restauramos la consola después de cada prueba
    vi.restoreAllMocks();
  });

  it('debería alternar turnos y declarar un ganador', () => {
    const juego = new Conecta4();
    juego.jugarTurno(0); 
    juego.jugarTurno(1); 
    juego.jugarTurno(0); 
    juego.jugarTurno(1); 
    juego.jugarTurno(0); 
    juego.jugarTurno(1); 
    
    // J1 juega en col 0 y debería ganar (4 en raya vertical)
    juego.jugarTurno(0); 

    // Verificamos que el mensaje de victoria se haya impreso
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('¡GANADOR: JUGADOR 1!'));
    // no debería permitir jugar después de que el juego haya terminado
    juego.jugarTurno(1);
    expect(consoleLogSpy).toHaveBeenCalledWith("El juego ha terminado.");
  });

});