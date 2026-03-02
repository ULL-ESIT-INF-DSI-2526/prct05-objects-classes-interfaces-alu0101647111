import { Persona, } from './persona'; 

export type Turno = "mañana" | "tarde" | "noche";

export class Medico extends Persona {
  protected _numColegiado: number;
  protected _especialidad: string;
  protected _turno: Turno;

  constructor(
    dni: string,
    nombreCompleto: string,
    fechaNacimiento: Date,
    telefono: string,
    email: string,
    numColegiado: number,
    especialidad: string,
    turno: Turno
  ) {
    super(dni, nombreCompleto, fechaNacimiento, telefono, email);
    this._numColegiado = numColegiado;
    this._especialidad = especialidad;
    this._turno = turno;
  }

  public get numColegiado(): number {
    return this._numColegiado;
  }

  public set numColegiado(value: number) {
    this._numColegiado = value;
  }

  public get especialidad(): string {
    return this._especialidad;
  }

  public set especialidad(value: string) {
    this._especialidad = value;
  }

  public get turno(): string {
    return this._turno;
  }

  public set turno(value: Turno) {
    this._turno = value;
  }

  public getResumen(): string {
    return `Nombre Medico: ${this.nombreCompleto}  Especialidad: ${this.especialidad}`
  }

}