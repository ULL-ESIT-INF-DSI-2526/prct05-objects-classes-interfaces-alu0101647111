import { describe, it, expect, beforeEach } from 'vitest';
import { Medico, Turno } from '../src/ejercicio-clase-1/medico'; 
import { Paciente } from '../src/ejercicio-clase-1/paciente'; 

describe('Clase Perspna', () => {
  let medico: Medico;
  let paciente: Paciente;
  let turno: Turno = "mañana";
  let date = new Date(1999, 2, 15);
  let date1 = new Date(2999, 2, 15);

  beforeEach(() => {
    medico = new Medico("43491742Y", "Lucia", date, "640232323", "lucia@gmail.com",343 , "cirujana", turno);
    paciente = new Paciente("43491742Y", "Lucia", date, "640232323", "lucia@gmail.com",343 , "cirujana", ["acaros"]);
  });

  describe('Clase Medico', () => {
    it('Getters', () => {
      expect(medico.dni).toBe("43491742Y");
      expect(medico.dni).toBe("43491742Y");
      expect(() => medico.dni = "8765431Z").toThrow("DNI inválido");
      expect(medico.nombreCompleto).toBe("Lucia");
      expect(medico.fechaNacimiento).toBe(date);
      expect(() => medico.fechaNacimiento = date1).toThrow("La fecha no puede ser futura");
      expect(medico.telefono).toBe("640232323");
      expect(medico.email).toBe("lucia@gmail.com");
      expect(() => medico.email = "8765431Z").toThrow("Email inválido");
      expect(medico.numColegiado).toBe(343);
      expect(medico.especialidad).toBe("cirujana");
      expect(medico.turno).toBe(turno);
    });
    it('Creacion con error', () => {
      expect(() => new Medico("434", "Luica", date, "640232323", "lucia@gmail.com",343 , "cirujana", turno)).toThrow("DNI inválido");
    });
    it('Funcion resumen', () => {
      expect(medico.getResumen()).toBe("Nombre Medico: Lucia  Especialidad: cirujana");
      expect(paciente.getResumen()).toBe("Nombre Paciente: Lucia  Numero Historial: 343");
    });
    });

});
