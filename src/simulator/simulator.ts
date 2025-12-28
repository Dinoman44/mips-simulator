import { RegisterBank } from "../util/operands/register";
import { Instruction } from "../util/instructions/instruction";
import { parseCode } from "./parser";
import { ProgramCounter } from "./program-counter";

class Simulator {
    private registers: RegisterBank = new RegisterBank();
    private instructions: Map<string, Instruction>;
    private pc: ProgramCounter = new ProgramCounter();

    constructor(code: string) {
        const instructions = parseCode(code, this.registers);
        this.instructions = new Map();
        let address = new ProgramCounter();
        for (const instruction of instructions) {
            this.instructions.set(address.getCounter(), instruction);
            address.next();
        }
    }

    run(): void {
        while (this.instructions.get(this.pc.getCounter())) {
            const instr: Instruction = this.instructions.get(this.pc.getCounter())!;
            instr.executeInstruction();
            this.pc.next();
        }
    }

    getProgramCounters(): [string, string][] {
        const pcStates: [string, string][] = [];
        let address = new ProgramCounter();
        while (this.instructions.get(address.getCounter())) {
            pcStates.push([address.getCounter(), this.instructions.get(address.getCounter())!.toString()]);
            address.next();
        }
        return pcStates;
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