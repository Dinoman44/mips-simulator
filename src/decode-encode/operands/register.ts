import { TwoWayMap } from "../../util/dsa/map.ts";

class TwoWayMapRegisterToNumber extends TwoWayMap<string, number> {
    getNumber(reg: string): number | undefined {
        return this.getB(reg);
    }

    isValidRegister(reg: string): boolean {
        return this.isValidA(reg);
    }

    getRegister(number: number): string | undefined {
        return this.getA(number);
    }

    isValidNumber(number: number): boolean {
        return this.isValidB(number);
    }
}

class Register {
    private readonly _label: string;
    private readonly _number: number;
    private readonly _binaryString: string;
    static readonly register_mapping: TwoWayMapRegisterToNumber = new TwoWayMapRegisterToNumber([
        ["$zero", 0],
        ["$v0", 2],
        ["$v1", 3],
        ["$a0", 4],
        ["$a1", 5],
        ["$a2", 6],
        ["$a3", 7],
        ["$t0", 8],
        ["$t1", 9],
        ["$t2", 10],
        ["$t3", 11],
        ["$t4", 12],
        ["$t5", 13],
        ["$t6", 14],
        ["$t7", 15],
        ["$s0", 16],
        ["$s1", 17],
        ["$s2", 18],
        ["$s3", 19],
        ["$s4", 20],
        ["$s5", 21],
        ["$s6", 22],
        ["$s7", 23],
        ["$t8", 24],
        ["$t9", 25],
    ]);
    static readonly reservedRegisters: Set<number> = new Set<number>([1, 26, 27, 28, 29, 30, 31]);

    static parseRegisterForNumber(reg: string): Register {
        if (/^\$\d+$/gi.test(reg)) {
            let regNum: number = parseInt(reg.slice(1), 10);
            console.log(regNum);
            if (this.register_mapping.isValidNumber(regNum)) {
                return new Register(this.register_mapping.getRegister(regNum)!, regNum);
            } else if (regNum < 0 || regNum > 31) {
                throw new Error(`Register number out of range (0-31): ${reg}`);
            } else if (this.reservedRegisters.has(regNum)) {
                throw new Error(`Register number ${regNum} is reserved and cannot be used.`);
            } else {
                throw new Error(`${regNum} is not a valid register.`);
            }
        } else if (/^\$(zero|[vats]\d+)$/gi.test(reg)) {
            if (this.register_mapping.isValidRegister(reg)) {
                return new Register(reg, this.register_mapping.getNumber(reg)!);
            }
            throw new Error(`"${reg}" is not a valid register.`);
        } else {
            throw new Error(`Invalid register format: ${reg}`);
        }
    }

    static parseRegisterForLabel(regNum: number): Register {
        if (this.register_mapping.isValidNumber(regNum)) {
            return new Register(this.register_mapping.getRegister(regNum)!, regNum);
        } else if (regNum < 0 || regNum > 31) {
            throw new Error(`Register number out of range (0-31): ${regNum}`);
        } else if (regNum in this.reservedRegisters) {
            throw new Error(`Register number ${regNum} is reserved and cannot be used.`);
        } else {
            throw new Error(`${regNum} is not a valid register.`);
        }
    }

    private constructor(label: string, number: number) {
        this._label = label;
        this._number = number;
        this._binaryString = number.toString(2).padStart(5, "0");
    }

    label(): string {
        return this._label;
    }

    number(): number {
        return this._number;
    }

    binaryString(): string {
        return this._binaryString;
    }
}

export {
    Register
};
