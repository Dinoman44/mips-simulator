import { isBinary, isHexadecimal, hexToBinary32BitUnsigned, binTo32bitUnsigned, anyTo32bitUnsigned, bin32BitToHex, binTo32bitSigned, hexTo32bitSigned, anyTo32bitSigned } from "./numbers.ts";

class Immediate {
    private readonly _value: number;
    private readonly _32bitBinaryString: string;
    private readonly _width: number;
    private readonly _32bitHexString: string;

    private static parseImmediateUnsigned(value: string): string {
        if (isBinary(value)) {
            return binTo32bitUnsigned(value)
        } else if (isHexadecimal(value)) {
            return hexToBinary32BitUnsigned(value)
        } else {
            return anyTo32bitUnsigned(value)
        }
    }

    private static parseImmediateSigned(value: string): string {
        if (isBinary(value)) {
            return binTo32bitSigned(value)
        } else if (isHexadecimal(value)) {
            return hexTo32bitSigned(value)
        } else {
            console.log("here");
            return anyTo32bitSigned(value);
        }
    }

    static makeUnsignedImmediate(value: string, width: number): Immediate {
        const binaryString = Immediate.parseImmediateUnsigned(value);
        const unsignedValue = parseInt(binaryString, 2);
        const hexString = bin32BitToHex(binaryString);
        return new Immediate(unsignedValue, binaryString, hexString, width);
    }

    static makeSignedImmediate(value: string, width: number = 16): Immediate {
        console.log(value);
        const binaryString = Immediate.parseImmediateSigned(value);
        console.log(binaryString);
        const signedValue = parseInt(binaryString, 2) >> 0;
        const hexString = bin32BitToHex(binaryString);
        return new Immediate(signedValue, binaryString, hexString, width);
    }

    private constructor(value: number, binaryString: string, hexString: string, width: number) {
        if (width < 1 || width > 32) {
            throw new Error(`Immediate width "${width}" is out of bounds (1-32).`);
        }
        if (value > (1 << width) - 1 || value < -(1 << (width - 1))) {
            throw new Error(`Immediate value "${value}" does not fit in ${width} bits.`);
        }
        if (binaryString.length !== 32) {
            throw new Error(`Binary string length "${binaryString.length}" is not 32 bits.`);
        }
        if (hexString.length !== 8) {
            throw new Error(`Hex string length "${hexString.length}" is not 8 hex digits.`);
        }
        this._value = value;
        this._32bitBinaryString = binaryString;
        this._32bitHexString = hexString;
        this._width = width;
    }

    value(): number {
        return this._value;
    }

    binaryString(): string {
        return this._32bitBinaryString.slice(32 - this._width);
    }

    hexString(): string {
        return this._32bitHexString;
    }

    fullBinaryString(): string {
        return this._32bitBinaryString;
    }
}


export {
    Immediate
}