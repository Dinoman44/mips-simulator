import { ParsedInstruction } from "../decode-encode/encoder/instruction-parse";
import { Instruction } from "../util/instructions/instruction";

function getLines(text: string): string[] {
    return text.split(";").map(line => line.trim()).filter(line => line.length > 0);
}

function parseLine(line: string): string[] {
    return ParsedInstruction.parseLine(line);
}

function makeInstruction(line: string, parsedLine: string[]) {
    return Instruction.makeInstruction(line, parsedLine);
}

function parseCode(text: string): Instruction[] {
    return getLines(text).map(
        line => makeInstruction(line, parseLine(line))
    );
}

export { parseCode };