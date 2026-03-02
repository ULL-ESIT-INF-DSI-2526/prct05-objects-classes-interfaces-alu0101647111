// src/models/Hospital.ts
import { Medico } from "./medico";
import { Paciente } from "./paciente";

export interface Cita {
  medicoDni: string;
  pacienteDni: string;
  fecha: Date;
}

/**
 * Clase principal para representar un hospital y sus citas
 * 
 */
export class Hospital {
  private medicos: Medico[] = [];
  private pacientes: Paciente[] = [];
  private citas: Cita[] = [];

  constructor(private maxCitasDiarias: number) {}

  public registrarMedico(medico: Medico): void {
    this.medicos.push(medico);
  }

  public registrarPaciente(paciente: Paciente): void {
    this.pacientes.push(paciente);
  }

  public buscarMedicoPorDni(dni: string): Medico | undefined {
    return this.medicos.find(m => m.dni === dni);
  }

  public buscarPacientePorDni(dni: string): Paciente | undefined {
    return this.pacientes.find(p => p.dni === dni);
  }

  public filtrarMedicos(especialidad?: string, turno?: string): Medico[] {
    return this.medicos.filter(m =>
      (!especialidad || m.especialidad === especialidad) &&
      (!turno || m.turno === turno)
    );
  }

  public listarMedicos(): Medico[] {
    return [...this.medicos];
  }

  public listarPacientes(): Paciente[] {
    return [...this.pacientes];
  }

  public crearCita(medicoDni: string, pacienteDni: string, fecha: Date): void {
    const medico = this.buscarMedicoPorDni(medicoDni);
    const paciente = this.buscarPacientePorDni(pacienteDni);

    if (!medico || !paciente) {
      throw new Error("Médico o paciente no registrado");
    }

    const citasDelDia = this.citas.filter(c =>
      c.medicoDni === medicoDni &&
      c.fecha.toDateString() === fecha.toDateString()
    );

    if (citasDelDia.length >= this.maxCitasDiarias) {
      throw new Error("Límite diario alcanzado");
    }

    this.citas.push({ medicoDni, pacienteDni, fecha });
  }

  public citasPorFecha(fecha: Date): Cita[] {
    return this.citas.filter(
      c => c.fecha.toDateString() === fecha.toDateString()
    );
  }
}