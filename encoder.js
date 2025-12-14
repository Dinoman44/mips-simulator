import { get_instruction, get_instruction_type } from "./encoder_util";

const r_type_regex = /^[a-zA-Z]{2,5}\s+\$\w{1,2},\s+\$\w{1,2},\s+\$\w{1,2};*$/;
const i_type_regex = /^[a-zA-Z]{2,5}\s+\$\w{1,2},\s+\$\w{1,2},\s+\d+;*$/;
const j_type_regex = /^j\s+\d+;*$/;
const lwsw_regex = /^[l|s]w\s+\$\w{1,2},\s+\d+\(\$\w{1,2}\);*$/;
function is_valid_instruction(instruction) {
    return instruction.match(r_type_regex) != null || instruction.match(i_type_regex) != null || instruction.match(j_type_regex) != null || instruction.match(lwsw_regex) != null;
}

function encode(instruction) {
    if (is_valid_instruction(instruction)) {
        let instr = get_instruction(instruction);
        let type = get_instruction_type(instr);
        if (type == "r") {
            return encode_r_format(instr, instruction);
        } else if (type == "i") {
            return encode_i_format(instr, instruction);
        } else if (type == "j") {
            return encode_j_format(instr, instruction);
        } else {
            return NaN;
        }
    }
}

function encode_r_format(instr, line) {

}