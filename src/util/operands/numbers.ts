import { TwoWayMap } from "../dsa/map";

/**********************************************************/
/**************** Check for number formats ****************/
/**********************************************************/
function isHexadecimal(value: string): boolean {
    return /^0x[0-9a-f]+$/gi.test(value);
}

function isBinary(value: string): boolean {
    return /^0b[01]+$/gi.test(value);
}

/*************************/
/**** Helpful mapping ****/
/*************************/
const hexToBinMapping : TwoWayMap<string, string> = new TwoWayMap([
    ["0", "0000"],
    ["1", "0001"],
    ["2", "0010"],
    ["3", "0011"],
    ["4", "0100"],
    ["5", "0101"],
    ["6", "0110"],
    ["7", "0111"],
    ["8", "1000"],
    ["9", "1001"],
    ["A", "1010"],
    ["B", "1011"],
    ["C", "1100"],
    ["D", "1101"],
    ["E", "1110"],
    ["F", "1111"],
]);

/*******************************************************************/
/**************** Convert to unsigned 32-bit binary ****************/
/*******************************************************************/
function binTo32bitUnsigned(value: string): string {
    const cleaned = value.replace(/^0b/gi, "");
    return cleaned.padStart(32, "0");
}

function hexToBinary32BitUnsigned(value: string): string {
    const cleaned = value.replace(/^0x/gi, "").toUpperCase();
    let binaryString = "";
    for (const char of cleaned) binaryString += hexToBinMapping.getB(char);
    return binTo32bitUnsigned(binaryString);
}

function anyTo32bitUnsigned(value: string): string {
    const num = Number(value);
    if (isNaN(num)) {
        throw new Error(`Value "${value}" is not a valid number.`);
    }
    if (num < 0) {
        throw new Error(`Value "${value}" is negative; cannot be treated as unsigned.`);
    }
    return binTo32bitUnsigned(num.toString(2));
}

/*****************************************************************/
/**************** Convert to signed 32-bit binary ****************/
/*****************************************************************/
function binTo32bitSigned(value: string): string {
    const cleaned = value.replace(/^0b/gi, "");
    return cleaned[0] === "1" ? cleaned.padStart(32, "1") : cleaned.padStart(32, "0");
}

function hexTo32bitSigned(value: string): string {
    const cleaned = value.replace(/^0x/gi, "").toUpperCase();
    let binaryString = "";
    for (const char of cleaned) binaryString += hexToBinMapping.getB(char);
    return binTo32bitSigned(binaryString);
}

function anyTo32bitSigned(value: string): string {
    let num = Number(value);
    if (isNaN(num)) {
        throw new Error(`Value "${value}" is not a valid number.`);
    }
    num >>= 0;
    return twosComplement(num);
}

function twosComplement(num: number): string {
    if (num >= 0) {
        return binTo32bitUnsigned(num.toString(2));
    } else {
        const absNum = Math.abs(num);
        const binaryString = absNum.toString(2).padStart(32, "0");
        let inverted = "";
        for (const bit of binaryString) {
            inverted += bit === "0" ? "1" : "0";
        }
        let carry = 1;
        let result = "";
        for (let i = 31; i >= 0; i--) {
            const sum = parseInt(inverted[i]) + carry;
            if (sum === 2) {
                result = "0" + result;
                carry = 1;
            } else if (sum === 3) {
                result = "1" + result;
                carry = 1;
            } else {
                result = sum.toString() + result;
                carry = 0;
            }
        }
        return result;
    }
}

function binary32BitToSignedInt(bin: string): number {
    if (bin.length !== 32) {
        throw new Error(`Binary string length "${bin.length}" is not 32 bits.`);
    }
    return parseInt(bin, 2) >> 0;
}

/**********************************************************************/
/**************** Convert 32-bit binary to hexadecimal ****************/
/**********************************************************************/
function bin32BitToHex(value: string): string {
    const cleaned = value.replace(/^0b/gi, "");
    let hexString = "";
    for (let i = 0; i < 32; i += 4) hexString += hexToBinMapping.getA(cleaned.slice(i, i + 4));
    return hexString;
}


export {
    isBinary,
    isHexadecimal,
    binTo32bitUnsigned,
    hexToBinary32BitUnsigned,
    anyTo32bitUnsigned,
    bin32BitToHex,
    hexTo32bitSigned,
    binTo32bitSigned,
    anyTo32bitSigned,
    binary32BitToSignedInt
}