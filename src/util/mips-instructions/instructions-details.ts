import { RFormatInstructionList, IFormatInstructionList, JFormatInstructionList } from "./instruction-list";

class RFormatInstructionDetails {
    private static _instructionList: string[] = RFormatInstructionList.getAllInstructions();

    private static _instructionUsages: string[] = [
        "add $rd, $rs, $rt",
        "addu $rd, $rs, $rt",
        "and $rd, $rs, $rt",
        "nor $rd, $rs, $rt",
        "or $rd, $rs, $rt",
        "slt $rd, $rs, $rt",
        "sltu $rd, $rs, $rt",
        "sll $rd, $rt, shamt",
        "srl $rd, $rt, shamt",
        "sub $rd, $rs, $rt",
        "subu $rd, $rs, $rt"
    ];
    private static _instructionUsageExamples: string[] = [
        "add $t0, $t1, $t2",
        "addu $s0, $s1, $s2",
        "and $t3, $t4, $t5",
        "nor $s3, $s4, $s5",
        "or $t6, $t7, $t8",
        "slt $s6, $s7, $t9",
        "sltu $t0, $t1, $t2",
        "sll $t3, $t4, 4",
        "srl $s0, $s1, 2",
        "sub $t5, $t6, $t7",
        "subu $s2, $s3, $s4"
    ];

    static getDetails(): [string, string, string][] {
        return this._instructionList.map(
            (instr, i) => [instr, this._instructionUsages[i], this._instructionUsageExamples[i]]
        );
    }
}

class IFormatInstructionDetails {
    private static _instructionList: string[] = IFormatInstructionList.getAllInstructions();

    private static _instructionUsages: string[] = [
        "addi $rt, $rs, immediate",
        "addiu $rt, $rs, immediate",
        "andi $rt, $rs, immediate",
        "beq $rs, $rt, offset",
        "bne $rs, $rt, offset",
        "lbu $rt, immediate($rs)",
        "lhu $rt, immediate($rs)",
        "ll $rt, immediate($rs)",
        "lui $rt, immediate",
        "lw $rt, immediate($rs)",
        "ori $rt, $rs, immediate",
        "slti $rt, $rs, immediate",
        "sltiu $rt, $rs, immediate",
        "sb $rt, immediate($rs)",
        "sc $rt, immediate($rs)",
        "sh $rt, immediate($rs)",
        "sw $rt, immediate($rs)"
    ];
    private static _instructionUsageExamples: string[] = [
        "addi $t0, $t1, 10",
        "addiu $s0, $s1, -5",
        "andi $t2, $t3, 15",
        "beq $s2, $s3, 8",
        "bne $t4, $t5, -4",
        "lbu $t6, 0($s4)",
        "lhu $s5, 4($s6)",
        "ll $t7, 8($s7)",
        "lui $s0, 0x1234",
        "lw $t8, 12($s1)",
        "ori $s2, $s3, 0xFF",
        "slti $t9, $t0, 20",
        "sltiu $s4, $s5, 30",
        "sb $t1, 16($s2)",
        "sc $s3, 20($s4)",
        "sh $t2, 24($s5)",
        "sw $s6, 28($s7)"
    ];

    static getDetails(): [string, string, string][] {
        return this._instructionList.map(
            (instr, i) => [instr, this._instructionUsages[i], this._instructionUsageExamples[i]]
        );
    }
}

class JFormatInstructionDetails {
    private static _instructionList: string[] = JFormatInstructionList.getAllInstructions();

    private static _instructionUsages: string[] = [
        "j address",
    ];
    private static _instructionUsageExamples: string[] = [
        "j 0x00400000",
    ];

    static getDetails(): [string, string, string][] {
        return this._instructionList.map(
            (instr, i) => [instr, this._instructionUsages[i], this._instructionUsageExamples[i]]
        );
    }
}

export { RFormatInstructionDetails, IFormatInstructionDetails, JFormatInstructionDetails };