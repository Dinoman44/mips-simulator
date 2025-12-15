import { RFormatInstructionList, IFormatInstructionList, JFormatInstructionList, ShiftInstructionList, MemOpInstructionList, BranchInstructionList, } from "../mips-instructions/instruction-list.ts";
import { ParsedInstruction } from "./instruction-parse.ts";
import { Register } from "../operands/register.ts";
import { Immediate, ShiftAmountImmediate, ITypeImmediate, JumpAddressImmediate } from "../operands/immediate.ts";
import { InstructionAfterEncode, RformatAfterEncode, IFormatAfterEncode, JFormatAfterEncode } from "./after-encode.tsx";

abstract class LiteralInstruction {
    protected readonly parsedInstruction: ParsedInstruction;
    protected readonly line: string;
    protected readonly instr: string;
    protected readonly operands: string[];

    static makeInstruction(line: string): LiteralInstruction {
        const parsed = new ParsedInstruction(line);
        const instr = parsed.getInstruction();

        if (RFormatInstructionList.isValid(instr)) {
            return new RformatLiteralInstruction(line);
        } else if (IFormatInstructionList.isValid(instr)) {
            return new IformatLiteralInstruction(line);
        } else if (JFormatInstructionList.isValid(instr)) {
            return new JformatLiteralInstruction(line);
        } else {
            throw new Error(`Instruction "${instr}" is not a valid MIPS instruction.`);
        }
    }

    constructor(line: string) {
        this.line = line;
        this.parsedInstruction = new ParsedInstruction(this.line);
        this.instr = this.parsedInstruction.getInstruction();
        this.operands = this.parsedInstruction.getOperands();
    }

    abstract encode(): InstructionAfterEncode;
}

class RformatLiteralInstruction extends LiteralInstruction {
    encode(): InstructionAfterEncode {
        if (ShiftInstructionList.isValid(this.instr)) {
            // shift instruction: sll/srl rd, rt, shamt
            let opcode: string = RFormatInstructionList.getOpcode(this.instr);
            let rs: string = "00000";
            let funct: string = RFormatInstructionList.getFunctCode(this.instr);

            let rt: Register = Register.parseRegisterForNumber(this.operands[1]);
            let rd: Register = Register.parseRegisterForNumber(this.operands[0]);
            let shamt: Immediate = new ShiftAmountImmediate(this.operands[2]);

            return new RformatAfterEncode(this, [opcode, rs, rt.binaryString(), rd.binaryString(), shamt.binaryString(), funct]);
        } else {
            // other R-format instruction: instr rd, rs, rt
            let rs: Register = Register.parseRegisterForNumber(this.operands[1]);
            let rt: Register = Register.parseRegisterForNumber(this.operands[2]);
            let rd: Register = Register.parseRegisterForNumber(this.operands[0]);
            let opcode: string = "000000";
            let funct: string = RFormatInstructionList.getFunctCode(this.instr);
            let shamt: string = "00000";

            return new RformatAfterEncode(this, [opcode, rs.binaryString(), rt.binaryString(), rd.binaryString(), shamt, funct]);
        }

    }
}

class IformatLiteralInstruction extends LiteralInstruction {
    encode(): InstructionAfterEncode {
        if (MemOpInstructionList.isValid(this.instr)) {
            // memory operation: lw/sw rt, immediate(rs)
            let opcode: string = IFormatInstructionList.getOpcode(this.instr);
            let rt: Register = Register.parseRegisterForNumber(this.operands[0]);
            let rs: Register = Register.parseRegisterForNumber(this.operands[2]);
            let immediate: Immediate = new ITypeImmediate(this.operands[1]);

            return new IFormatAfterEncode(this, [opcode, rs.binaryString(), rt.binaryString(), immediate.binaryString()]);
        } else if (BranchInstructionList.isValid(this.instr)) {
            // branch instruction: beq/bne rs, rt, immediate
            let opcode: string = IFormatInstructionList.getOpcode(this.instr);
            let rs: Register = Register.parseRegisterForNumber(this.operands[0]);
            let rt: Register = Register.parseRegisterForNumber(this.operands[1]);
            let immediate: Immediate = new ITypeImmediate(this.operands[2]);
            
            return new IFormatAfterEncode(this, [opcode, rs.binaryString(), rt.binaryString(), immediate.binaryString()]);
        } else {
            // other I-format instruction: instr rt, rs, immediate
            let opcode: string = IFormatInstructionList.getOpcode(this.instr);
            let rt: Register = Register.parseRegisterForNumber(this.operands[0]);
            let rs: Register = Register.parseRegisterForNumber(this.operands[1]);
            let immediate: Immediate = new ITypeImmediate(this.operands[2]);

            return new IFormatAfterEncode(this, [opcode, rs.binaryString(), rt.binaryString(), immediate.binaryString()]);
        }
    }
}

class JformatLiteralInstruction extends LiteralInstruction {
    encode(): InstructionAfterEncode {
        // jump instruction: j address
        let opcode: string = JFormatInstructionList.getOpcode(this.instr);
        let address: Immediate = new JumpAddressImmediate(this.operands[0]);

        return new JFormatAfterEncode(this, [opcode, address.binaryString()]);
    }
}

export {
    LiteralInstruction,
};