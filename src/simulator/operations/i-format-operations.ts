import { Register } from "../../util/operands/register";
import { binary32BitToSignedInt } from "../../util/operands/numbers";
import { Immediate } from "../../util/operands/immediate";
import { ProgramCounter } from "../program-counter";

function addi(rt: Register, rs: Register, immediate: Immediate): void {
    const result = binary32BitToSignedInt(rs.value()) + binary32BitToSignedInt(immediate.fullBinaryString());
    if (result > 0x7FFFFFFF || result < -0x80000000) {
        throw new Error(`Integer overflow occurred during addition: ${rs.label()} (${rs.value()}) + ${immediate.value()} (${immediate.fullBinaryString()})`);
    }
    rt.setValue(Immediate.makeSignedImmediate(result.toString(), 32).fullBinaryString());
}

function addiu(rt: Register, rs: Register, immediate: Immediate): void {
    const result = (binary32BitToSignedInt(rs.value()) >>> 0) + (binary32BitToSignedInt(immediate.fullBinaryString()) >>> 0);
    rt.setValue(Immediate.makeUnsignedImmediate((result >>> 0).toString(), 32).fullBinaryString());
}

function andi(rt: Register, rs: Register, immediate: Immediate): void {
    const result = (binary32BitToSignedInt(rs.value()) & binary32BitToSignedInt(immediate.fullBinaryString())) >>> 0;
    rt.setValue(Immediate.makeUnsignedImmediate(result.toString(), 32).fullBinaryString());
}

function lui(rt: Register, immediate: Immediate): void {
    const result = (binary32BitToSignedInt(immediate.fullBinaryString()) << 16) >>> 0;
    rt.setValue(Immediate.makeUnsignedImmediate(result.toString(), 32).fullBinaryString());
}

function ori(rt: Register, rs: Register, immediate: Immediate): void {
    const result = (binary32BitToSignedInt(rs.value()) | binary32BitToSignedInt(immediate.fullBinaryString())) >>> 0;
    rt.setValue(Immediate.makeUnsignedImmediate(result.toString(), 32).fullBinaryString());
}

function slti(rt: Register, rs: Register, immediate: Immediate): void {
    const result = binary32BitToSignedInt(rs.value()) < binary32BitToSignedInt(immediate.fullBinaryString()) ? 1 : 0;
    rt.setValue(Immediate.makeUnsignedImmediate(result.toString(), 32).fullBinaryString());
}

function sltiu(rt: Register, rs: Register, immediate: Immediate): void {
    const result = (binary32BitToSignedInt(rs.value()) >>> 0) < (binary32BitToSignedInt(immediate.fullBinaryString()) >>> 0) ? 1 : 0;
    rt.setValue(Immediate.makeUnsignedImmediate(result.toString(), 32).fullBinaryString());
}

function beq(rs: Register, rt: Register, immediate: Immediate, pc: ProgramCounter): void {
    if (rs.value() === rt.value()) pc.branch(immediate);
    else pc.next();
}

function bne(rs: Register, rt: Register, immediate: Immediate, pc: ProgramCounter): void {
    if (rs.value() !== rt.value()) pc.branch(immediate);
    else pc.next();
}

export {
    addi,
    addiu,
    andi,
    lui,
    ori,
    slti,
    sltiu,
    beq,
    bne
};