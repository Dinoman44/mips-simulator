function isHexadecimal(value: string): boolean {
    return /^(0x)?[0-9a-f]+$/gi.test(value);
}

function isBinary(value: string): boolean {
    return /^(0b)?[01]+$/gi.test(value);
}

function binToNumber(value: string): number {
    value = value.replace(/^0b/gi, "");
    return parseInt(value, 2);
}

function hexToNumber(value: string): number {
    value = value.replace(/^0x/gi, "");
    return parseInt(value, 16);
}

function anyToNumber(value: string): number {
    const num = Number(value);
    if (isNaN(num)) {
        throw new Error(`Immediate value "${value}" is not a valid number.`);
    }
    return num;
}

export {
    isBinary,
    isHexadecimal,
    binToNumber,
    hexToNumber,
    anyToNumber
}