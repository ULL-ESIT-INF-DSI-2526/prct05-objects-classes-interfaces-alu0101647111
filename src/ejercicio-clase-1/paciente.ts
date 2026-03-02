import { Persona, } from './persona'; 

export class Paciente extends Persona {
  protected _numHistorial: number;
  protected _grupoSang: string;
  protected _alergias: string[];
  
  constructor(
    dni: string,
    nombreCompleto: string,
    fechaNacimiento: Date,
    telefono: string,
    email: string,
    numHistorial: number,
    grupoSang: string,
    alergias: string[]
  ) {
    super(dni, nombreCompleto, fechaNacimiento, telefono, email);
    this._numHistorial = numHistorial;
    this._grupoSang = grupoSang;
    this._alergias = alergias;
  }

  public get numHistorial(): number {
    return this._numHistorial;
  }

  public set numHistorial(value: number) {
    this._numHistorial = value;
  }

  public get grupoSang(): string {
    return this._grupoSang;
  }

  public set grupoSang(value: string) {
    this._grupoSang = value;
  }

  public get alergias(): string[] {
    return this._alergias;
  }

  public set alergias(value: string[]) {
    this._alergias = value;
  }

  public getResumen(): string {
    return `Nombre Paciente: ${this._nombreCompleto}  Numero Historial: ${this._numHistorial}`
  }
}