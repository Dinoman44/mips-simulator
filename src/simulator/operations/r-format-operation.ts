import { Register } from "../../util/operands/register";
import { binary32BitToSignedInt } from "../../util/operands/numbers";
import { Immediate } from "../../util/operands/immediate";

function add(rd: Register, rs: Register, rt: Register): void {
    const result = binary32BitToSignedInt(rs.value()) + binary32BitToSignedInt(rt.value());
    if (result > 0x7FFFFFFF || result < -0x80000000) {
        throw new Error(`Integer overflow occurred during addition: ${rs.label()} (${rs.value()}) + ${rt.label()} (${rt.value()})`);
    }
    rd.setValue(Immediate.makeSignedImmediate(result.toString(), 32).fullBinaryString());
}

function addu(rd: Register, rs: Register, rt: Register): void {
    const result = (binary32BitToSignedInt(rs.value()) >>> 0) + (binary32BitToSignedInt(rt.value()) >>> 0);
    rd.setValue(Immediate.makeUnsignedImmediate((result >>> 0).toString(), 32).fullBinaryString());
}

function and(rd: Register, rs: Register, rt: Register): void {
    const result = (binary32BitToSignedInt(rs.value()) & binary32BitToSignedInt(rt.value())) >>> 0;
    rd.setValue(Immediate.makeUnsignedImmediate(result.toString(), 32).fullBinaryString());
}

function nor(rd: Register, rs: Register, rt: Register): void {
    const result = ~(binary32BitToSignedInt(rs.value()) | binary32BitToSignedInt(rt.value())) >>> 0;
    rd.setValue(Immediate.makeUnsignedImmediate(result.toString(), 32).fullBinaryString());
}

function or(rd: Register, rs: Register, rt: Register): void {
    const result = (binary32BitToSignedInt(rs.value()) | binary32BitToSignedInt(rt.value())) >>> 0;
    rd.setValue(Immediate.makeUnsignedImmediate(result.toString(), 32).fullBinaryString());
}

function slt(rd: Register, rs: Register, rt: Register): void {
    const result = binary32BitToSignedInt(rs.value()) < binary32BitToSignedInt(rt.value()) ? 1 : 0;
    rd.setValue(Immediate.makeUnsignedImmediate(result.toString(), 32).fullBinaryString());
}

function sltu(rd: Register, rs: Register, rt: Register): void {
    const result = (binary32BitToSignedInt(rs.value()) >>> 0) < (binary32BitToSignedInt(rt.value()) >>> 0) ? 1 : 0;
    rd.setValue(Immediate.makeUnsignedImmediate(result.toString(), 32).fullBinaryString());
}

function sll(rd: Register, rt: Register, shamt: Immediate): void {
    const result = (binary32BitToSignedInt(rt.value()) << binary32BitToSignedInt(shamt.fullBinaryString())) >>> 0;
    rd.setValue(Immediate.makeUnsignedImmediate(result.toString(), 32).fullBinaryString());
}

function srl(rd: Register, rt: Register, shamt: Immediate): void {
    const result = (binary32BitToSignedInt(rt.value()) >>> binary32BitToSignedInt(shamt.fullBinaryString())) >>> 0;
    rd.setValue(Immediate.makeUnsignedImmediate(result.toString(), 32).fullBinaryString());
}

function sub(rd: Register, rs: Register, rt: Register): void {
    const result = binary32BitToSignedInt(rs.value()) - binary32BitToSignedInt(rt.value());
    if (result > 0x7FFFFFFF || result < -0x80000000) {
        throw new Error(`Integer overflow occurred during subtraction: ${rs.label()} (${rs.value()}) - ${rt.label()} (${rt.value()})`);
    }
    rd.setValue(Immediate.makeSignedImmediate(result.toString(), 32).fullBinaryString());
}

function subu(rd: Register, rs: Register, rt: Register): void {
    const result = (binary32BitToSignedInt(rs.value()) >>> 0) - (binary32BitToSignedInt(rt.value()) >>> 0);
    rd.setValue(Immediate.makeUnsignedImmediate((result >>> 0).toString(), 32).fullBinaryString());
}

export {
    add,
    addu,
    and,
    nor,
    or,
    slt,
    sltu,
    sll,
    srl,
    sub,
    subu
}