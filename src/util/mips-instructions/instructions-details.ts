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
    private static _instructionInfos: string[] = [
        "Adds the values in registers $rs and $rt and stores the result in register $rd.\nPerforms 2's complement signed integer addition.\nRaises an exception on overflow.",
        "Adds the values in registers $rs and $rt and stores the result in register $rd.\nPerforms unsigned integer addition.\nDoes not raise an exception on overflow.",
        "Performs a bitwise AND operation between the values in registers $rs and $rt and stores the result in register $rd.",
        "Performs a bitwise NOR operation between the values in registers $rs and $rt and stores the result in register $rd.",
        "Performs a bitwise OR operation between the values in registers $rs and $rt and stores the result in register $rd.",
        "Sets register $rd to 1 if the value in register $rs is less than the value in register $rt (considered as signed integers); otherwise, sets $rd to 0.",
        "Sets register $rd to 1 if the value in register $rs is less than the value in register $rt (considered as unsigned integers); otherwise, sets $rd to 0.",
        "Shifts the value in register $rt left by the number of bits specified in shamt and stores the result in register $rd.\nFills the least significant bits with zeros, does not rotate bits.\nShamt is a 5-bit unsigned integer(0-31).",
        "Shifts the value in register $rt right by the number of bits specified in shamt and stores the result in register $rd.\nFills the most significant bits with zeros, does not rotate bits.\nShamt is a 5-bit unsigned integer(0-31).",
        "Subtracts the value in register $rt from the value in register $rs and stores the result in register $rd.\nPerforms 2's complement signed integer subtraction.\nRaises an exception on overflow.",
        "Subtracts the value in register $rt from the value in register $rs and stores the result in register $rd.\nPerforms unsigned integer subtraction.\nDoes not raise an exception on overflow."
    ];

    static getDetails(): [string, string, string, string][] {
        return this._instructionList.map(
            (instr, i) => [
                instr,
                this._instructionUsages[i],
                this._instructionUsageExamples[i],
                this._instructionInfos[i]
            ]
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

    private static _instructionInfos: string[] = [
        "Adds the sign-extended immediate value to the value in register $rs and stores the result in register $rt.\nRaises an exception on overflow.\nImmediate is a 16-bit signed integer.",
        "Adds the sign-extended immediate value to the value in register $rs and stores the result in register $rt.\nDoes not raise an exception on overflow.\nImmediate is a 16-bit signed integer, but treated as unsigned for addition.",
        "Performs a bitwise AND operation between the value in register $rs and the zero-extended immediate value, storing the result in register $rt.\nImmediate is a 16-bit unsigned integer.",
        "Compares the values in registers $rs and $rt; if they are equal, branches to the instruction computed by adding the sign-extended offset (immediate value) to the current instruction number + 1.\nOffset is a 16-bit signed integer representing number of instructions.\nIn reality it calculates the target PC address: target = PC + 4 + (immediate << 2)",
        "Compares the values in registers $rs and $rt; if they are not equal, branches to the instruction computed by adding the sign-extended offset (immediate value) to the current instruction number + 1.\nOffset is a 16-bit signed integer representing number of instructions.\nIn reality it calculates the target PC address: target = PC + 4 + (immediate << 2)",
        "Loads a byte from memory at the address computed by adding the sign-extended immediate value to the value in register $rs, and stores it in the least significant byte of register $rt.\nThe upper 24 bits of $rt are filled with zeros.\nImmediate is a 16-bit signed integer.",
        "Loads a halfword (2 bytes) from memory at the address computed by adding the sign-extended immediate value to the value in register $rs, and stores it in the least significant 16 bits of register $rt.\nThe upper 16 bits of $rt are filled with zeros.\nImmediate is a 16-bit signed integer.",
        "Loads a word from memory at the address computed by adding the sign-extended immediate value to the value in register $rs, and stores it in register $rt.\nImmediate is a 16-bit signed integer.\nUsed along with sc instruction for atomic read-modify-write operations for multithreaded synchronisation.",
        "Loads the immediate value into the upper 16 bits of register $rt, setting the lower 16 bits to zero.\nImmediate is a 16-bit unsigned integer.",
        "Loads a word from memory at the address computed by adding the sign-extended immediate value to the value in register $rs, and stores it in register $rt.\nImmediate is a 16-bit signed integer.",
        "Performs a bitwise OR operation between the value in register $rs and the zero-extended immediate value, storing the result in register $rt.\nImmediate is a 16-bit unsigned integer.",
        "Sets register $rt to 1 if the value in register $rs is less than the sign-extended immediate value (considered as signed integers); otherwise, sets $rt to 0.\nImmediate is a 16-bit signed integer.",
        "Sets register $rt to 1 if the value in register $rs is less than the zero-extended immediate value (considered as unsigned integers); otherwise, sets $rt to 0.\nImmediate is a 16-bit unsigned integer.",
        "Stores the least significant byte of register $rt into memory at the address computed by adding the sign-extended immediate value to the value in register $rs.\nImmediate is a 16-bit signed integer.",
        "Store conditionally: if the processor's LLbit is set, stores the word in register $rt into memory at the address computed by adding the sign-extended immediate value to the value in register $rs, and then clears the LLbit.\nImmediate is a 16-bit signed integer.\nUsed along with ll instruction for atomic read-modify-write operations for multithreaded synchronisation.",
        "Stores the least significant halfword (2 bytes) of register $rt into memory at the address computed by adding the sign-extended immediate value to the value in register $rs.\nImmediate is a 16-bit signed integer.",
        "Stores the word in register $rt into memory at the address computed by adding the sign-extended immediate value to the value in register $rs.\nImmediate is a 16-bit signed integer."
    ];

    static getDetails(): [string, string, string, string][] {
        return this._instructionList.map(
            (instr, i) => [
                instr,
                this._instructionUsages[i],
                this._instructionUsageExamples[i],
                this._instructionInfos[i]
            ]
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
    private static _instructionInfos: string[] = [
        "Jumps to the target PC address specified by the 26-bit address field.\nThe target address is computed by combining the upper 4 bits of the current PC + 4 with the 26-bit address shifted left by 2 bits to form a full 32-bit address.",
    ];

    static getDetails(): [string, string, string, string][] {
        return this._instructionList.map(
            (instr, i) => [
                instr,
                this._instructionUsages[i],
                this._instructionUsageExamples[i],
                this._instructionInfos[i]
            ]
        );
    }
}

export { RFormatInstructionDetails, IFormatInstructionDetails, JFormatInstructionDetails };