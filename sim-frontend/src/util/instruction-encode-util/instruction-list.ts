class RFormatInstructionList {
    private static readonly rFormatInstructionList: string[] = [
        "add",
        "addu",
        "and",
        "nor",
        "or",
        "slt",
        "sltu",
        "sll",
        "srl",
        "sub",
        "subu"
    ];
    private static readonly rFormatInstructions: Set<string> = new Set(
        this.rFormatInstructionList
    );

    private static readonly rFormatFunctCodes: string[] = [
        "100000",
        "100001",
        "100100",
        "100111",
        "100101",
        "101010",
        "101011",
        "000000",
        "000010",
        "100010",
        "100011"
    ];
    private static readonly functCodeMapping: Map<string, string> = new Map<string, string>(
        this.rFormatInstructionList.map(
                (instr, index) => [instr, this.rFormatFunctCodes[index]]
            )
    );

    static isValid(instr: string): boolean {
        return this.rFormatInstructions.has(instr);
    }

    static getOpcode(_: string): string {
        return "000000";
    }

    static getFunctCode(instr: string): string {
        return this.functCodeMapping.get(instr) || "";
    }
}

class ShiftInstructionList extends RFormatInstructionList {
    private static readonly shiftInstructions: Set<string> = new Set([
        "sll",
        "srl"
    ]);

    static isValid(instr: string): boolean {
        return this.shiftInstructions.has(instr);
    }
}

class IFormatInstructionList {
    private static readonly iFormatInstructionList: string[] = [
        "addi",
        "addiu",
        "andi",
        "beq",
        "bne",
        "lbu",
        "lhu",
        "ll",
        "lui",
        "lw",
        "ori",
        "slti",
        "sltiu",
        "sb",
        "sc",
        "sh",
        "sw"
    ];
    private static readonly iFormatInstructions: Set<string> = new Set(
        this.iFormatInstructionList
    );

    protected static readonly opcodes: string[] = [
        "001000",
        "001001",
        "001100",
        "000100",
        "000101",
        "100100",
        "100101",
        "110000",
        "001111",
        "100011",
        "001101",
        "001010",
        "001011",
        "101000",
        "111000",
        "101001",
        "101011"
    ];
    protected static readonly opcodeMapping: Map<string, string> = new Map<string, string>(
        this.iFormatInstructionList.map((instr, index) => [instr, IFormatInstructionList.opcodes[index]])
    );

    static isValid(instr: string): boolean {
        return this.iFormatInstructions.has(instr);
    }

    static getOpcode(instr: string): string {
        return this.opcodeMapping.get(instr) || "";
    }
}

class MemOpInstructionList extends IFormatInstructionList {
    private static readonly memOpInstructions: Set<string> = new Set([
        "lw",
        "sw",
        "lbu",
        "lhu",
        "ll",
        "sb",
        "sc",
        "sh"
    ]);

    static isValid(instr: string): boolean {
        return this.memOpInstructions.has(instr);
    }
}

class BranchInstructionList extends IFormatInstructionList {
    private static readonly branchInstructions: Set<string> = new Set([
        "beq",
        "bne"
    ]);

    static isValid(instr: string): boolean {
        return this.branchInstructions.has(instr);
    }
}

class JFormatInstructionList {
    private static readonly jFormatInstructionList: string[] = [
        "j"
    ];
    private static readonly jFormatInstructions: Set<string> = new Set(
        this.jFormatInstructionList
    );
    private static readonly opcodes: string[] = [
        "000010"
    ];
    private static readonly opcodeMapping: Map<string, string> = new Map<string, string>(
        this.jFormatInstructionList.map((instr, index) => [instr, JFormatInstructionList.opcodes[index]])
    );

    static isValid(instr: string): boolean {
        return this.jFormatInstructions.has(instr);
    }

    static getOpcode(instr: string): string {
        return this.opcodeMapping.get(instr) || "";
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