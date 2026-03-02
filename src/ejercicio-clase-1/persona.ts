// src/models/Persona.ts

/**
 * Clase abstracta que representa una persona del sistema.
 * Contiene propiedades comunes a médicos y pacientes.
 */
export abstract class Persona {
  protected _dni: string;
  protected _nombreCompleto: string;
  protected _fechaNacimiento: Date;
  protected _telefono: string;
  protected _email: string;

  constructor(
    dni: string,
    nombreCompleto: string,
    fechaNacimiento: Date,
    telefono: string,
    email: string
  ) {
    const dniRegex = /^[0-9]{8}[A-Za-z]$/;
    if (!dniRegex.test(dni)) {
      throw new Error("DNI inválido");
    }
    this._dni = dni;
    this._nombreCompleto = nombreCompleto;
    if (fechaNacimiento >= new Date()) {
      throw new Error("Fecha de nacimiento futura");
    }
    this._fechaNacimiento = fechaNacimiento;
    if (telefono.length != 9) {
      throw new Error("Número de telefono con tamaño distinto de 9")
    }
    this._telefono = telefono;

    this._email = email;
  }

  public get dni(): string {
    return this._dni;
  }

  public set dni(value: string) {
    const dniRegex = /^[0-9]{8}[A-Za-z]$/;
    if (!dniRegex.test(value)) {
      throw new Error("DNI inválido");
    }
    this._dni = value;
  }

  public get nombreCompleto(): string {
    return this._nombreCompleto;
  }

  public set nombreCompleto(value: string) {
    this._nombreCompleto = value;
  }


  public get fechaNacimiento(): Date {
    return this._fechaNacimiento;
  }

  public set fechaNacimiento(value: Date) {
    if (value > new Date()) {
      throw new Error("La fecha no puede ser futura");
    }
    this._fechaNacimiento = value;
  }

  public get telefono(): string {
    return this._telefono;
  }

  public set telefono(value: string) {
    if (!/^[0-9]{9}$/.test(value)) {
      throw new Error("Teléfono inválido");
    }
    this._telefono = value;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    if (!value.includes("@")) {
      throw new Error("Email inválido");
    }
    this._email = value;
  }

  /**
   * Devuelve un resumen textual de la persona.
   */
  public abstract getResumen(): string;
}





