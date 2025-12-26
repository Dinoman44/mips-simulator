import { ParsedInstruction } from "../decode-encode/encoder/instruction-parse";
import { Instruction } from "../util/instructions/instruction";
import { RegisterBank } from "../util/operands/register";

function getLines(text: string): string[] {
    return text.split(";").map(line => line.trim()).filter(line => line.length > 0);
}

function parseLine(line: string): string[] {
    return ParsedInstruction.parseLine(line);
}

function makeInstruction(line: string, parsedLine: string[], regBank: RegisterBank) {
    return Instruction.makeInstruction(line, parsedLine, regBank);
}

function parseCode(text: string, regBank: RegisterBank): Instruction[] {
    return getLines(text).map(
        line => makeInstruction(line, parseLine(line), regBank)
    );
}

export { parseCode };