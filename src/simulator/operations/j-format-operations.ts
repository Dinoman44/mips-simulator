import { Immediate } from "../../util/operands/immediate";
import { ProgramCounter } from "../program-counter";

function jump(address: string, pc: ProgramCounter): void {
    pc.jump("0b" + pc.getCounter()[0] + Immediate.makeUnsignedImmediate(address, 26).binaryString() + "00");
}

export {
    jump
};