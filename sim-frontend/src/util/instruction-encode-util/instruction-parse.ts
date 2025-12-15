class ParsedInstruction {
    instruction: string;
    parts: string[];

    static parseLine(line: string): string[] {
        return line.split(/[\s()]+/).map(part => part.trim().replace(",", "")).filter(part => part.length > 0);
    }

    constructor(instruction: string) {
        this.instruction = instruction;
        this.parts = ParsedInstruction.parseLine(instruction);
    }

    getInstruction(): string {
        return this.parts.length > 0 ? this.parts[0] : "";
    }

    getOperands(): string[] {
        return this.parts.slice(1);
    }
}

export {
    ParsedInstruction
};