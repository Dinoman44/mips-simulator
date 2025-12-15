class Immediate {
    private readonly _value: number;
    private readonly _binaryString: string;
    private readonly _width: number;
    private readonly _hexString: string;

    static validateImmediate(value: string): void {
        if (isNaN(Number(value))) throw new Error(`Immediate value "${value}" is not a valid number.`);
    }

    constructor(value: number, binaryStringWidth?: number, binaryString?: string) {
        this._value = value;
        if (binaryStringWidth !== undefined) {
            this._binaryString = value.toString(2).padStart(binaryStringWidth, "0");
            this._width = binaryStringWidth;
        } else if (binaryString !== undefined) {
            this._binaryString = binaryString;
            this._width = binaryString.length;
        } else {
            throw new Error("Either binaryStringWidth or binaryString must be provided.");
        }
        this._hexString = parseInt(this._binaryString, 2).toString(16).toUpperCase().padStart(Math.ceil(this._width / 4), "0");
    }

    value(): number {
        return this._value;
    }

    binaryString(): string {
        return this._binaryString;
    }

    hexString(): string {
        return this._hexString;
    }

    width(): number {
        return this._width;
    }
}

class ShiftAmountImmediate extends Immediate {
    constructor(value: string) {
        Immediate.validateImmediate(value);
        const numValue = Number(value);
        if (numValue < 0 || numValue > 31) {
            throw new Error(`Shift amount must be between 0 and 31. Given: ${value}`);
        }
        super(numValue, 5);
    }
}

class ITypeImmediate extends Immediate {
    constructor(value: string) {
        Immediate.validateImmediate(value);
        const numValue = Number(value);
        if (numValue < (-1 << 15) || numValue > (1 << 16) - 1) {
            throw new Error(`I-Type immediate must be between -32768 and 65535. Given: ${value}`);
        }
        let binaryString: string;
        if (numValue >= 0) {
            binaryString = numValue.toString(2).padStart(16, "0");
        } else {
            binaryString = (numValue >>> 0).toString(2).padStart(16, "1").slice(-16);
        }
        super(numValue, undefined, binaryString);
    }
}

class JumpAddressImmediate extends Immediate {
    constructor(value: string) {
        Immediate.validateImmediate(value);
        const numValue = Number(value);
        if (numValue < 0 || numValue > (1 << 26) - 1) {
            throw new Error(`Jump address immediate must be between 0 and 67108863. Given: ${value}`);
        }
        super(numValue, 26);
    }
}

export {
    Immediate,
    ShiftAmountImmediate,
    ITypeImmediate,
    JumpAddressImmediate
}