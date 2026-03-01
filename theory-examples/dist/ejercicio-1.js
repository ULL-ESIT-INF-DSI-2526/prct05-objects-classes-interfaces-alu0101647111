"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromIntToActions = fromIntToActions;
// 1. Definimos el enumerado. Usamos comillas para permitir espacios en los nombres.
// TypeScript genera automáticamente un "mapeo inverso", por lo que SenalCorporal[64] nos devolverá "Agacharse".
var SenalCorporal;
(function (SenalCorporal) {
    SenalCorporal[SenalCorporal["Parpadear"] = 1] = "Parpadear";
    SenalCorporal[SenalCorporal["Parpadear dos veces"] = 2] = "Parpadear dos veces";
    SenalCorporal[SenalCorporal["Mover la nariz"] = 4] = "Mover la nariz";
    SenalCorporal[SenalCorporal["Levantar las cejas"] = 8] = "Levantar las cejas";
    SenalCorporal[SenalCorporal["Saltar"] = 16] = "Saltar";
    SenalCorporal[SenalCorporal["Saltar a la pata coja"] = 32] = "Saltar a la pata coja";
    SenalCorporal[SenalCorporal["Agacharse"] = 64] = "Agacharse";
    SenalCorporal[SenalCorporal["Dar un aplauso"] = 128] = "Dar un aplauso";
})(SenalCorporal || (SenalCorporal = {}));
/**
 *
 * @param num - Número entero positivo que indica las señales corporales
 * @returns - Array de strings con las acciones correspondiente
 */
function fromIntToActions(num) {
    // 2. Validación: Debe ser un número entero estrictamente positivo (> 0)
    if (!Number.isInteger(num) || num <= 0) {
        return undefined;
    }
    const acciones = [];
    // 3. Comprobamos bit a bit usando el operador AND (&)
    // Si la operación no da 0, significa que esa potencia de 2 está incluida en el número.
    if ((num & 1) !== 0)
        acciones.push(SenalCorporal[1]);
    if ((num & 2) !== 0)
        acciones.push(SenalCorporal[2]);
    if ((num & 4) !== 0)
        acciones.push(SenalCorporal[4]);
    if ((num & 8) !== 0)
        acciones.push(SenalCorporal[8]);
    if ((num & 16) !== 0)
        acciones.push(SenalCorporal[16]);
    if ((num & 32) !== 0)
        acciones.push(SenalCorporal[32]);
    if ((num & 64) !== 0)
        acciones.push(SenalCorporal[64]);
    if ((num & 128) !== 0)
        acciones.push(SenalCorporal[128]);
    // Nota: Las señales mayores a 128 (256, 512, etc.) simplemente se ignoran 
    // porque no hemos añadido sentencias `if` para evaluarlas.
    return acciones;
}
//# sourceMappingURL=ejercicio-1.js.map