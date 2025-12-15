class ParsedEncodedInstruction {
    private readonly _binaryEncodedInstruction: string;
    private parts: string[];

    private static convertToBinary(encodedInstruction: string): string {
        const num = Number(encodedInstruction);
        return num.toString(2).padStart(32, "0");
    }

    private parseBinaryInstruction(): string[] {
        const opcode = this.getOpcode();
        
    }

    constructor(originalEncodedInstruction: string) {
        this._binaryEncodedInstruction = ParsedEncodedInstruction.convertToBinary(originalEncodedInstruction);
    }

    binaryEncodedInstruction(): string {
        return this._binaryEncodedInstruction;
    }

    getOpcode(): string {
        return this._binaryEncodedInstruction.slice(0, 6);
    }
}