import { Register } from "../../util/operands/register.ts";
import { Immediate } from "../../util/operands/immediate.ts";
import { BranchInstructionList, IFormatInstructionList, JFormatInstructionList, MemOpInstructionList, RFormatInstructionList, ShiftInstructionList, UnsignedIFormatInstructionList } from "../../util/instructions/instruction-list.ts";

class Instruction {
    protected _instr: string;
    protected _parts: string[];
    protected _op: string;

    static makeInstruction(instr: string, parts: string[]): Instruction {
        const op = parts[0];
        if (RFormatInstructionList.isValid(op)) {
            return new RFormatInstruction(instr, parts);
        } else if (IFormatInstructionList.isValid(op)) {
            return new IFormatInstruction(instr, parts);
        } else if (JFormatInstructionList.isValid(op)) {
            return new JFormatInstruction(instr, parts);
        } else {
            throw new Error(`Instruction "${instr}" is not a valid MIPS instruction.`);
        }
    }

    constructor(instr: string, parts: string[]) {
        this._instr = instr;
        this._parts = parts;
        this._op = parts[0];
    }

    op(): string {
        return this._op;
    }
}

class RFormatInstruction extends Instruction {
    private _rs: Register | null;
    private _rt: Register;
    private _rd: Register;
    private _shamt: Immediate | null;

    constructor(instr: string, parts: string[]) {
        super(instr, parts);
        if (ShiftInstructionList.isValid(this._op)) {
            // shift instruction: sll/srl rd, rt, shamt
            this._rd = Register.parseRegisterForNumber(parts[1]);
            this._rt = Register.parseRegisterForNumber(parts[2]);
            this._shamt = Immediate.makeUnsignedImmediate(parts[3], 5);
            this._rs = null;
        } else {
            // other R-format: instr rd, rs, rt
            this._rd = Register.parseRegisterForNumber(parts[1]);
            this._rs = Register.parseRegisterForNumber(parts[2]);
            this._rt = Register.parseRegisterForNumber(parts[3]);
            this._shamt = null;
        }
    }

    rsValue(): string | null {
        return this._rs ? this._rs.value() : null;
    }

    rdValue(): string {
        return this._rd.value();
    }

    rtValue(): string {
        return this._rt.value();
    }

    shamt(): number | null {
        return this._shamt ? this._shamt.value() : null;
    }
}

class IFormatInstruction extends Instruction {
    private _rs: Register | null;
    private _rt: Register;
    private _immediate: Immediate;

    constructor(instr: string, parts: string[]) {
        super(instr, parts);
        if (BranchInstructionList.isValid(this._op)) {
            // branch instruction: beq/bne rs, rt, immediate
            this._rs = Register.parseRegisterForNumber(parts[1]);
            this._rt = Register.parseRegisterForNumber(parts[2]);
            this._immediate = Immediate.makeSignedImmediate(parts[3], 16);
        } else if (MemOpInstructionList.isValid(this._op)) {
            // memory operation: lw/sw rt, immediate(rs)
            this._rt = Register.parseRegisterForNumber(parts[1]);
            this._immediate = Immediate.makeSignedImmediate(parts[2], 16);
            this._rs = Register.parseRegisterForNumber(parts[3]);
        } else if (UnsignedIFormatInstructionList.isValid(this._op)) {
            if (this._op === "lui") {
                // lui rt, immediate
                this._rt = Register.parseRegisterForNumber(parts[1]);
                this._immediate = Immediate.makeUnsignedImmediate(parts[2], 16);
                this._rs = null;
            } else {
                // unsigned I-format: instr rt, rs, immediate
                this._rt = Register.parseRegisterForNumber(parts[1]);
                this._rs = Register.parseRegisterForNumber(parts[2]);
                this._immediate = Immediate.makeUnsignedImmediate(parts[3], 16);
            }
        } else {
            // signed I-format: instr rt, rs, immediate
            this._rt = Register.parseRegisterForNumber(parts[1]);
            this._rs = Register.parseRegisterForNumber(parts[2]);
            this._immediate = Immediate.makeSignedImmediate(parts[3]);
        }
    }

    rsValue(): string | null {
        return this._rs ? this._rs.value() : null;
    }

    rtValue(): string {
        return this._rt.value();
    }

    immediateValue(): number {
        return this._immediate.value();
    }
}

class JFormatInstruction extends Instruction {
    private _address: number;

    constructor(instr: string, parts: string[]) {
        super(instr, parts);
        this._address = parseInt(parts[1], 10);
    }

    addressValue(): number {
        return this._address;
    }
}

export { Instruction };