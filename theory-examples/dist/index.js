"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onePunch = onePunch;
function onePunch(...args) {
    const filtered = args.filter(s => s !== '');
    if (filtered.length === 0)
        return 'Broken!';
    // Encadenamiento de 3 métodos: sort, join y replace
    return filtered.sort().join(' ').replace(/[ae]/gi, '');
}
console.log(onePunch('Beard', 'Jeans', 'Hairbrush', 'Knuckleduster', 'Sand'));
console.log(onePunch('Sock', 'Beard', 'Vest', 'Lady', 'Sage'));
console.log(onePunch('', ''));
console.log(onePunch());
//# sourceMappingURL=index.js.map