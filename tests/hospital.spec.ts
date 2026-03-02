import { describe, it, expect, beforeEach } from 'vitest';
import { Medico, Turno } from '../src/ejercicio-clase-1/medico'; 
import { Paciente } from '../src/ejercicio-clase-1/paciente'; 
import { Hospital } from '../src/ejercicio-clase-1/hospital'; 

describe('Clase Perspna', () => {
  let medico: Medico;
  let paciente: Paciente;
  let hospital: Hospital;
  let turno: Turno = "mañana";
  let date = new Date(1999, 2, 15);


  beforeEach(() => {
    medico = new Medico("43491742Y", "Lucia", date, "640232323", "lucia@gmail.com",343 , "cirujana", turno);
    paciente = new Paciente("43491742Y", "Lucia", date, "640232323", "lucia@gmail.com",343 , "cirujana", ["acaros"]);
    hospital = new Hospital(1);
  });

  describe('Clase Hospital', () => {
    it('Funcion resumen', () => {
      hospital.registrarMedico(medico);
      expect(() => hospital.crearCita(medico.dni, paciente.dni, new Date())).toThrow("Médico o paciente no registrado");
      let medicos = hospital.listarMedicos();
      let salida1 = medicos.forEach((m: Medico) => m.getResumen())
      expect(salida1).toBe(undefined);
      hospital.registrarPaciente(paciente);
      let pacientes = hospital.listarPacientes();
      let salida = pacientes.forEach((p: Paciente) => p.getResumen())
      expect(salida).toBe("Nombre Paciente: Lucia  Numero Historial: 343");
      hospital.crearCita(medico.dni, paciente.dni, new Date());
      expect(() => hospital.crearCita(medico.dni, paciente.dni, new Date())).toThrow("Límite diario alcanzado");

      let medicos2 = hospital.filtrarMedicos("cirujana");
      let salida2 = medicos2.forEach((m: Medico) => m.getResumen())
      expect(salida2).toBe("Nombre Medico: Lucia  Especialidad: cirujana");
    });

    });

});
