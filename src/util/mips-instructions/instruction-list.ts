import { TwoWayMap } from "../../util/dsa/map.ts";

class TwoWayMapInstructionToCode extends TwoWayMap<string, string> {
    getCode(instr: string): string | undefined {
        return this.getB(instr);
    }

    isValidInstruction(instr: string): boolean {
        return this.isValidA(instr);
    }

    getInstruction(code: string): string | undefined {
        return this.getA(code);
    }

    isValidCode(code: string): boolean {
        return this.isValidB(code);
    }

    getAllInstructions(): string[] {
        return this.getAllA();
    }

    getAllCodes(): string[] {
        return this.getAllB();
    }
}

class RFormatInstructionList {
    private static readonly functCodePairs: [string, string][] = [
        ["add", "100000"],
        ["addu", "100001"],
        ["and", "100100"],
        ["nor", "100111"],
        ["or", "100101"],
        ["slt", "101010"],
        ["sltu", "101011"],
        ["sll", "000000"],
        ["srl", "000010"],
        ["sub", "100010"],
        ["subu", "100011"],
    ];
    private static readonly functCodeMapping: TwoWayMapInstructionToCode = new TwoWayMapInstructionToCode(
        this.functCodePairs
    );

    static isValid(instr_or_opcode: string): boolean {
        return this.functCodeMapping.isValidInstruction(instr_or_opcode) || this.functCodeMapping.isValidCode(instr_or_opcode);
    }

    static getOpcode(_: string): string {
        return "000000";
    }

    static getFunctCode(instr: string): string {
        const code: string | undefined = this.functCodeMapping.getCode(instr);
        if (!code) {
            throw new Error(`Instruction "${instr}" is not a valid R-format instruction.`);
        }
        return code;
    }

    static getInstruction(functCode: string): string {
        const instr: string | undefined = this.functCodeMapping.getInstruction(functCode);
        if (!instr) {
            throw new Error(`Funct code "${functCode}" is not a valid R-format funct code.`);
        }
        return instr;
    }

    static getAllInstructions(): string[] {
        return this.functCodeMapping.getAllInstructions();
    }
}

class ShiftInstructionList extends RFormatInstructionList {
    private static readonly shiftInstructions: [string, string][] = [
        ["sll", "000000"],
        ["srl", "000010"]
    ];
    private static readonly shiftInstructionMapping: TwoWayMapInstructionToCode = new TwoWayMapInstructionToCode(
        this.shiftInstructions
    );

    static isValid(instr_or_opcode: string): boolean {
        return this.shiftInstructionMapping.isValidInstruction(instr_or_opcode) || this.shiftInstructionMapping.isValidCode(instr_or_opcode);
    }
}

class IFormatInstructionList {
    private static readonly instructionPairs: [string, string][] = [
        ["addi", "001000"],
        ["addiu", "001001"],
        ["andi", "001100"],
        ["beq", "000100"],
        ["bne", "000101"],
        ["lbu", "100100"],
        ["lhu", "100101"],
        ["ll", "110000"],
        ["lui", "001111"],
        ["lw", "100011"],
        ["ori", "001101"],
        ["slti", "001010"],
        ["sltiu", "001011"],
        ["sb", "101000"],
        ["sc", "111000"],
        ["sh", "101001"],
        ["sw", "101011"]
    ];
    private static readonly instructionMapping: TwoWayMapInstructionToCode = new TwoWayMapInstructionToCode(
        this.instructionPairs
    );

    static isValid(instr_or_opcode: string): boolean {
        return this.instructionMapping.isValidInstruction(instr_or_opcode) || this.instructionMapping.isValidCode(instr_or_opcode);
    }

    static getOpcode(instr: string): string {
        const code = this.instructionMapping.getCode(instr);
        if (!code) {
            throw new Error(`Instruction "${instr}" is not a valid I-format instruction.`);
        }
        return code;
    }

    static getInstruction(opcode: string): string {
        const instr = this.instructionMapping.getInstruction(opcode);
        if (!instr) {
            throw new Error(`Opcode "${opcode}" is not a valid I-format opcode.`);
        }
       return instr;
    }

    static getAllInstructions(): string[] {
        return this.instructionMapping.getAllInstructions();
    }
}

class MemOpInstructionList extends IFormatInstructionList {
    private static readonly opcodePairs: [string, string][] = [
        ["lw", "100011"],
        ["sw", "101011"],
        ["lbu", "100100"],
        ["lhu", "100101"],
        ["ll", "110000"],
        ["sb", "101000"],
        ["sc", "111000"],
        ["sh", "101001"]
    ];
    private static readonly memInstructionMapping: TwoWayMapInstructionToCode = new TwoWayMapInstructionToCode(
        this.opcodePairs
    );

    static isValid(instr_or_opcode: string): boolean {
        return this.memInstructionMapping.isValidInstruction(instr_or_opcode) || this.memInstructionMapping.isValidCode(instr_or_opcode);
    }
}

class BranchInstructionList extends IFormatInstructionList {
    private static readonly opcodePairs: [string, string][] = [
        ["beq", "000100"],
        ["bne", "000101"]
    ];
    private static readonly opcodeMapping: TwoWayMapInstructionToCode = new TwoWayMapInstructionToCode(
        this.opcodePairs
    );

    static isValid(instr_or_opcode: string): boolean {
        return this.opcodeMapping.isValidInstruction(instr_or_opcode) || this.opcodeMapping.isValidCode(instr_or_opcode);
    }
}

class JFormatInstructionList {
    private static readonly opcodePairs: [string, string][] = [
        ["j", "000010"]
    ];
    private static readonly opcodeMapping: TwoWayMapInstructionToCode = new TwoWayMapInstructionToCode(
        this.opcodePairs
    );

    static isValid(instr_or_opcode: string): boolean {
        return this.opcodeMapping.isValidInstruction(instr_or_opcode) || this.opcodeMapping.isValidCode(instr_or_opcode);
    }

    static getOpcode(instr: string): string {
        const code: string | undefined = this.opcodeMapping.getCode(instr);
        if (!code) {
            throw new Error(`Instruction "${instr}" is not a valid J-format instruction.`);
        }
        return code;
    }

    static getInstruction(opcode: string): string {
        const instr: string | undefined = this.opcodeMapping.getInstruction(opcode);
        if (!instr) {
            throw new Error(`Opcode "${opcode}" is not a valid J-format opcode.`);
        }
        return instr;
    }

    static getAllInstructions(): string[] {
        return this.opcodeMapping.getAllInstructions();
    }
}

export {
    RFormatInstructionList,
    IFormatInstructionList,
    JFormatInstructionList,
    ShiftInstructionList,
    MemOpInstructionList,
    BranchInstructionList
}