import { Register } from "../util/operands/register";

class Simulator {
    private registers: Register[] = Register.registerMapping.getAllRegisters().map((regLabel: string) => {
        return Register.parseRegisterForLabel(
            Register.registerMapping.getNumber(regLabel)!
        );
    })
    private instructions: string[];
}