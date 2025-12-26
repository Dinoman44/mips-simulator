import { RegisterBank } from "../util/operands/register";
import { Immediate } from "../util/operands/immediate";
import { Instruction } from "../util/instructions/instruction";
import { parseCode } from "./parser";

class Simulator {
    private registers: RegisterBank = new RegisterBank();
    private instructions: Instruction[];
    private pc: Immediate = Immediate.makeUnsignedImmediate("0", 32);
    private instructionCounters: Immediate[];

    constructor(code: string) {
        this.instructions = parseCode(code, this.registers);
        this.instructionCounters = this.instructions.map((_, index: number) =>
            Immediate.makeUnsignedImmediate((index * 4).toString(), 32)
        );
    }

    run(): void {
        for (const instruction of this.instructions) {
            instruction.executeInstruction();
        }
    }

    getRegistersState(): [number, string, string, string, string, boolean][] {
        return this.registers.getState();
    }

    static blankState(): [number, string, string, string, string, boolean][] {
        const regBank = new RegisterBank();
        return regBank.getState();
    }
}

export { Simulator };