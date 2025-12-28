import { Immediate } from "../util/operands/immediate";

class ProgramCounter {
    private counter: Immediate;
    
    constructor() {
        this.counter = Immediate.makeUnsignedImmediate("0", 32);
    }

    getCounter(): string {
        return this.counter.hexString();
    }

    next(): void {
        try {
            this.counter = Immediate.makeUnsignedImmediate(`0b${(this.counter.value() + 4).toString(2)}`, 32);
        } catch (e) {
            throw new Error(`Program Counter overflowed: 0x${this.getCounter()} - program is too long!`);
        }
    }

    branch(immediate: Immediate): void {
        this.counter = this.counter.add(immediate).add(Immediate.makeUnsignedImmediate("0b100", 32));
    }

    jump(hexAddress: string): void {
        this.counter = Immediate.makeUnsignedImmediate(hexAddress, 32);
    }
}

export { ProgramCounter };