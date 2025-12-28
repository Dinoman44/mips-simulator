import { RegisterBank } from "../util/operands/register";
import { Instruction } from "../util/instructions/instruction";
import { parseCode } from "./parser";
import { ProgramCounter } from "./program-counter";

class Simulator {
    private registers: RegisterBank = new RegisterBank();
    private instructions: Map<string, Instruction>;
    private pc: ProgramCounter = new ProgramCounter();
    private executionHistory: [string, string, Array<any>][] = [];
    private numInstructionsExecuted: number = 0;

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
            this.executionHistory.push(["0x" + this.pc.getCounter(), instr.toString(), []]);
            instr.executeInstruction(this.pc);
            this.executionHistory[this.numInstructionsExecuted][2] = this.getModifiedRegistersState();
            this.numInstructionsExecuted++;
        }
    }

    getProgramCounters(): [string, string][] {
        const pcStates: [string, string][] = [];
        let address = new ProgramCounter();
        while (this.instructions.get(address.getCounter())) {
            pcStates.push(["0x" + address.getCounter(), this.instructions.get(address.getCounter())!.toString()]);
            address.next();
        }
        return pcStates;
    }

    getModifiedRegistersState(): [number, string, string, string, string, string][] {
        return this.registers.getStateModifiedOnly();
    }

    getRegistersState(): [number, string, string, string, string, string, boolean][] {
        return this.registers.getState();
    }

    getExecutionHistory(): [string, string, Array<any>][] {
        return this.executionHistory;
    }

    static blankState(): [number, string, string, string, string, string, boolean][] {
        const regBank = new RegisterBank();
        return regBank.getState();
    }
}

export { Simulator };