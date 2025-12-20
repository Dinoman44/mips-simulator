import { Register } from "../util/operands/register";
import { Immediate } from "../util/operands/immediate";
import { Instruction } from "../util/instructions/instruction";
import { parseCode } from "./parser";

class Simulator {
    private registers: Register[] = Register.registerMapping.getAllRegisters().map(
        (regLabel: string) =>  Register.parseRegisterForLabel(
            Register.registerMapping.getNumber(regLabel)!
        )
    );
    private instructions: Instruction[];
    private pc: Immediate = Immediate.makeUnsignedImmediate("0", 32);
    private instructionCounters: Immediate[];

    constructor(code: string) {
        this.instructions = parseCode(code);
        this.instructionCounters = this.instructions.map((_, index: number) =>
            Immediate.makeUnsignedImmediate((index * 4).toString(), 32)
        );
    }

    run(): void {
        return;
    }
}