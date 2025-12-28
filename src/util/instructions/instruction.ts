import { Register, RegisterBank } from "../../util/operands/register.ts";
import { Immediate } from "../../util/operands/immediate.ts";
import * as rop from "../../simulator/operations/r-format-operations.ts";
import * as iop from "../../simulator/operations/i-format-operations.ts";
import { BranchInstructionList, IFormatInstructionList, JFormatInstructionList, MemOpInstructionList, RFormatInstructionList, ShiftInstructionList, UnsignedIFormatInstructionList } from "../../util/instructions/instruction-list.ts";

class Instruction {
    protected _instr: string;
    protected _parts: string[];
    protected _op: string;

    static makeInstruction(instr: string, parts: string[], regBank: RegisterBank): Instruction {
        const op = parts[0];
        if (RFormatInstructionList.isValid(op)) {
            return new RFormatInstruction(instr, parts, regBank);
        } else if (IFormatInstructionList.isValid(op)) {
            return new IFormatInstruction(instr, parts, regBank);
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

    toString(): string {
        return this._instr;
    }

    executeInstruction(): void {}
}

class RFormatInstruction extends Instruction {
    private _rs: Register | null;
    private _rt: Register;
    private _rd: Register;
    private _shamt: Immediate | null;

    constructor(instr: string, parts: string[], regBank: RegisterBank) {
        super(instr, parts);
        if (ShiftInstructionList.isValid(this._op)) {
            // shift instruction: sll/srl rd, rt, shamt
            this._rd = regBank.get(Register.parseRegisterForNumber(parts[1]).number());
            this._rt = regBank.get(Register.parseRegisterForNumber(parts[2]).number());
            this._shamt = Immediate.makeUnsignedImmediate(parts[3], 5);
            this._rs = null;
        } else {
            // other R-format: instr rd, rs, rt
            this._rd = regBank.get(Register.parseRegisterForNumber(parts[1]).number());
            this._rs = regBank.get(Register.parseRegisterForNumber(parts[2]).number());
            this._rt = regBank.get(Register.parseRegisterForNumber(parts[3]).number());
            this._shamt = null;
        }
        if (this._rd.number() === 0) {
            throw new Error(`Cannot write to register $zero: "${this._instr}".`);
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

    executeInstruction(): void {
        switch (this._op) {
            case "add":
                rop.add(this._rd, this._rs!, this._rt);
                break;
            case "addu":
                rop.addu(this._rd, this._rs!, this._rt);
                break;
            case "and":
                rop.and(this._rd, this._rs!, this._rt);
                break;
            case "nor":
                rop.nor(this._rd, this._rs!, this._rt);
                break;
            case "or":
                rop.or(this._rd, this._rs!, this._rt);
                break;
            case "slt":
                rop.slt(this._rd, this._rs!, this._rt);
                break;
            case "sltu":
                rop.sltu(this._rd, this._rs!, this._rt);
                break;
            case "sll":
                rop.sll(this._rd, this._rt, this._shamt!);
                break;
            case "srl":
                rop.srl(this._rd, this._rt, this._shamt!);
                break;
            case "sub":
                rop.sub(this._rd, this._rs!, this._rt);
                break;
            case "subu":
                rop.subu(this._rd, this._rs!, this._rt);
                break;
            default:
                throw new Error(`R-format operation "${this._op}" is unknown.`);
        }
    }
}

class IFormatInstruction extends Instruction {
    private _rs: Register | null;
    private _rt: Register;
    private _immediate: Immediate;

    constructor(instr: string, parts: string[], regBank: RegisterBank) {
        super(instr, parts);
        if (BranchInstructionList.isValid(this._op)) {
            // branch instruction: beq/bne rs, rt, immediate
            this._rs = regBank.get(Register.parseRegisterForNumber(parts[1]).number());
            this._rt = regBank.get(Register.parseRegisterForNumber(parts[2]).number());
            this._immediate = Immediate.makeSignedImmediate(parts[3], 16);
        } else if (MemOpInstructionList.isValid(this._op)) {
            // memory operation: lw/sw rt, immediate(rs)
            this._rt = regBank.get(Register.parseRegisterForNumber(parts[1]).number());
            this._immediate = Immediate.makeSignedImmediate(parts[2], 16);
            this._rs = regBank.get(Register.parseRegisterForNumber(parts[3]).number());
        } else if (UnsignedIFormatInstructionList.isValid(this._op)) {
            if (this._op === "lui") {
                // lui rt, immediate
                this._rt = regBank.get(Register.parseRegisterForNumber(parts[1]).number());
                this._immediate = Immediate.makeUnsignedImmediate(parts[2], 16);
                this._rs = null;
            } else {
                // unsigned I-format: instr rt, rs, immediate
                this._rt = regBank.get(Register.parseRegisterForNumber(parts[1]).number());
                this._rs = regBank.get(Register.parseRegisterForNumber(parts[2]).number());
                this._immediate = Immediate.makeUnsignedImmediate(parts[3], 16);
            }
        } else {
            // signed I-format: instr rt, rs, immediate
            this._rt = regBank.get(Register.parseRegisterForNumber(parts[1]).number());
            this._rs = regBank.get(Register.parseRegisterForNumber(parts[2]).number());
            this._immediate = Immediate.makeSignedImmediate(parts[3]);
        }
        if (this._rt.number() === 0) {
            throw new Error(`Cannot write to register $zero: "${this._instr}".`);
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

    executeInstruction(): void {
        switch (this._op) {
            case "addi":
                iop.addi(this._rt, this._rs!, this._immediate);
                break;
            case "addiu":
                iop.addiu(this._rt, this._rs!, this._immediate);
                break;
            case "andi":
                iop.andi(this._rt, this._rs!, this._immediate);
                break;
            case "lui":
                iop.lui(this._rt, this._immediate);
                break;
            case "ori":
                iop.ori(this._rt, this._rs!, this._immediate);
                break;
            case "slti":
                iop.slti(this._rt, this._rs!, this._immediate);
                break;
            case "sltiu":
                iop.sltiu(this._rt, this._rs!, this._immediate);
                break;
            case "beq":
                throw new Error(`Branch instruction "beq" execution not implemented.`);
                break;
            case "bne":
                throw new Error(`Branch instruction "bne" execution not implemented.`);
                break;
            case "lw":
                throw new Error(`Memory operation "lw" execution not implemented.`);
                break;
            case "sw":
                throw new Error(`Memory operation "sw" execution not implemented.`);
                break;
            default:
                throw new Error(`I-format operation "${this._op}" is unknown.`);
        }
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