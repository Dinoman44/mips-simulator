const register_mapping: { [key: string]: number } = {
    "$zero": 0,
    "$v0": 2,
    "$v1": 3,
    "$a0": 4,
    "$a1": 5,
    "$a2": 6,
    "$a3": 7,
    "$t0": 8,
    "$t1": 9,
    "$t2": 10,
    "$t3": 11,
    "$t4": 12,
    "$t5": 13,
    "$t6": 14,
    "$t7": 15,
    "$s0": 16,
    "$s1": 17,
    "$s2": 18,
    "$s3": 19,
    "$s4": 20,
    "$s5": 21,
    "$s6": 22,
    "$s7": 23,
    "$t8": 24,
    "$t9": 25,
};

const r_format_functcodes: { [key: string]: string } = {
    "add": "100000",
    "addu": "100001",
    "and": "100100",
    "nor": "100111",
    "or": "100101",
    "slt": "101010",
    "sltu": "101011",
    "sll": "000000",
    "srl": "000010",
    "sub": "100010",
    "subu": "100011"
};

const i_format_opcodes: { [key: string]: string } = {
    "addi": "001000",
    "addiu": "001001",
    "andi": "001100",
    "beq": "000100",
    "bne": "000101",
    "lbu": "100100",
    "lhu": "100101",
    "ll": "110000",
    "lui": "001111",
    "lw": "100011",
    "ori": "001101",
    "slti": "001010",
    "sltiu": "001011",
    "sb": "101000",
    "sc": "111000",
    "sh": "101001",
    "sw": "101011"
};

const j_format_opcodes: { [key: string]: string } = {
    "j": "000010"
};

const r_format_instructions: Set<string> = new Set([
    "add",
    "addu",
    "and",
    "nor",
    "or",
    "slt",
    "sltu",
    "sll",
    "srl",
    "sub",
    "subu"
]);
  
const i_format_instructions: Set<string> = new Set([
    "addi",
    "addiu",
    "andi",
    "beq",
    "bne",
    "lbu",
    "lhu",
    "ll",
    "lui",
    "lw",
    "ori",
    "slti",
    "sltiu",
    "sb",
    "sc",
    "sh",
    "sw"
]);
  
const j_format_instructions: Set<string> = new Set([
    "j"
]);
  

function int_to_5bit_binstr(x: number): string {
    let binstr = "";
    for (let i = 16; i >= 1; i >>= 1) {
        if (x > i) {
            binstr += "1";
            x -= i;
        } else {
            binstr += "0";
        }
    }
    return binstr;
}

function get_instruction(line: string): string {
    return line.split(/\s+/)[0];
}

function get_instruction_type(instr: string): string {
    if (r_format_instructions.has(instr)) {
        return "r";
    } else if (i_format_instructions.has(instr)) {
        return "i";
    } else if (j_format_instructions.has(instr)) {
        return "j";
    } else {
        return "N";
    }
}

function get_instruction_opcode(instr: string, type: string): string {
    if (type == "r") {
        return "000000";
    } else if (type == "i") {
        return i_format_opcodes[instr];
    } else if (type == "j") {
        return j_format_opcodes[instr];
    } else { // should not reach here ever
        return "";
    }
}

function get_r_format_funct_code(instr: string): string {
    return r_format_functcodes[instr];
}

const lwsw: Set<string> = new Set(["sw", "lw"]);
const conditional: Set<string> = new Set(["bne", "beq"]);

function parse_operands(valid_line: string, instr: string, type: string) {
    let parts: string[] = valid_line.split(/\s+/);
    var operands: string[]; // [rs, rt, rd/immd]

    if (lwsw.has(instr)) { // sw/lw rt, immd(rs)
        let matcher: RegExpMatchArray | null = parts[2].match(/(\d+)\((.+)\)/);
        if (matcher == null) {
            throw new Error(`Invalid memory access format in instruction: ${valid_line}`);
        }
        operands = [
            matcher[2].trim(), // rs
            parts[1].trim().slice(0, -1), // rt
            matcher[1].trim() // immd
        ]
    } else if (conditional.has(instr)) { // bne/beq rs, rt, immd
        operands = [
            parts[1].trim().slice(0, -1), // rs
            parts[2].trim().slice(0, -1), // rt
            parts[3].trim() // immd
        ];
    } else if (type == "i") { // instr, rt, rs, immd
        operands = [
            parts[2].trim().slice(0, -1), // rs
            parts[1].trim().slice(0, -1), // rt
            parts[3].trim() // immd
        ];
    } else if (type == "r") { // instr, rd, rs, rt
        operands = [
            parts[2].trim().slice(0, -1), // rs
            parts[3].trim(), // rt
            parts[1].trim().slice(0, -1) // rd
        ];
    } else { // should not reach here ever
        operands = [];
    }

    return operands;
}

function map_register(register: string): number {
    let reg_num = Number(register.slice(1));
    return isNaN(reg_num) ? register_mapping[register] : reg_num;
}

export {
    register_mapping,
    r_format_functcodes,
    r_format_instructions,
    j_format_instructions,
    j_format_opcodes,
    i_format_instructions,
    i_format_opcodes,
    int_to_5bit_binstr,
    get_instruction,
    get_instruction_opcode,
    get_instruction_type,
    get_r_format_funct_code,
    parse_operands,
    map_register
};