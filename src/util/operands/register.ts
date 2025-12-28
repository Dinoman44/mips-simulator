import { TwoWayMap } from "../dsa/map.ts";
import { bin32BitToHex, binary32BitToSignedInt } from "./numbers.ts";

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

    getAllRegisters(): string[] {
        return this.getAllA();
    }
}

class Register {
    private readonly _label: string;
    private readonly _number: number;
    private readonly _binaryString: string;
    private _modified: boolean = false;
    private _binValue: string = "0".repeat(32);
    static readonly registerMapping: TwoWayMapRegisterToNumber = new TwoWayMapRegisterToNumber([
        ["$zero", 0],
        ["$at", 1],
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
        ["$k0", 26],
        ["$k1", 27],
        ["$gp", 28],
        ["$sp", 29],
        ["$fp", 30],
        ["$ra", 31]
    ]);
    static readonly reservedRegisterNumbers: Set<number> = new Set<number>([1, 26, 27, 28, 29, 30, 31]);
    static readonly reservedRegisterLabels: Set<string> = new Set<string>(["$at", "$k0", "$k1", "$gp", "$sp", "$fp", "$ra"]);

    static parseRegisterForNumber(reg: string): Register {
        if (/^\$\d+$/gi.test(reg)) {
            let regNum: number = parseInt(reg.slice(1), 10);
            if (this.registerMapping.isValidNumber(regNum)) {
                return new Register(this.registerMapping.getRegister(regNum)!, regNum);
            } else if (regNum < 0 || regNum > 31) {
                throw new Error(`Register number out of range (0-31): ${reg}`);
            }
            throw new Error(`$${regNum} is not a valid register.`);
        } else if (/^\$(zero|at|gp|fp|sp|ra|[vatsk]\d+)$/gi.test(reg)) {
            if (this.registerMapping.isValidRegister(reg)) {
                return new Register(reg, this.registerMapping.getNumber(reg)!);
            }
            throw new Error(`"${reg}" is not a valid register.`);
        } else {
            throw new Error(`Invalid register format: ${reg}`);
        }
    }

    static parseRegisterForLabel(regNum: number): Register {
        if (this.registerMapping.isValidNumber(regNum)) {
            return new Register(this.registerMapping.getRegister(regNum)!, regNum);
        } else if (regNum < 0 || regNum > 31) {
            throw new Error(`Register number out of range (0-31): ${regNum}`);
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

    value(): string {
        return this._binValue;
    }
    
    setValue(binValue: string): void {
        this._binValue = binValue;
        this._modified = true;
    }

    isModified(): boolean {
        return this._modified;
    }
}

class RegisterBank {
    private _registers: Register[];
    
    constructor() {
        this._registers = Register.registerMapping.getAllRegisters().map(
            regLabel => Register.parseRegisterForNumber(regLabel)
        );
    }

    get(regNum: number): Register {
        return this._registers[regNum];
    }

    getState(): [number, string, string, string, string, string, boolean][] {
        return this._registers.map(
            reg => [reg.number(), reg.label(), "0b" + reg.value(), binary32BitToSignedInt(reg.value()).toString(), parseInt(reg.value(), 2).toString(), "0x" + bin32BitToHex(reg.value()), reg.isModified()]
        );
    }

    getStateModifiedOnly(): [number, string, string, string, string, string][] {
        return this.getState().filter(
            regState => regState[6]
        ).map(
            regState => regState.slice(0, 6) as [number, string, string, string, string, string]
        );
    }
}

export {
    Register,
    RegisterBank
};
