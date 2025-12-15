class Register {
    private readonly _label: string;
    private readonly _number: number;
    private readonly _binaryString: string;
    static readonly register_mapping: Map<string, number> = new Map([
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
    static readonly reservedRegisters: Set<number> = new Set([1, 26, 27, 28, 29, 30, 31]);

    static parseRegister(reg: string): Register {
        let stripped: string = reg.trim().replace(/^\$/, "");
        if (this.register_mapping.has(`$${stripped}`)) {
            return new Register(`$${stripped}`, this.register_mapping.get(`$${stripped}`)!);
        }
        let regNum: number = parseInt(stripped, 10);
        if (isNaN(regNum)) {
            throw new Error(`Invalid register: ${reg}`);
        }
        if (regNum < 0 || regNum > 31) {
            throw new Error(`Register number out of range (0-31): ${reg}`);
        }
        if (regNum in this.reservedRegisters) {
            throw new Error(`Register number ${regNum} is reserved and cannot be used.`);
        }
        return new Register(`$${regNum}`, regNum);
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
