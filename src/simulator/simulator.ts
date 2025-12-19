import { Register } from "../util/operands/register";
import { Instruction } from "../util/instructions/instruction";
import { parseCode } from "./parser";

class Simulator {
    private registers: Register[] = Register.registerMapping.getAllRegisters().map((regLabel: string) => {
        return Register.parseRegisterForLabel(
            Register.registerMapping.getNumber(regLabel)!
        );
    })
    private instructions: Instruction[];

    constructor(code: string) {
        this.instructions = parseCode(code);
    }
}