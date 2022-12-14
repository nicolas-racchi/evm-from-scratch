import { MAX_256_BITS } from "../constants"

import type { OpcodeRunner, Runners } from "./types"

// enums don't support bigints
export const CALL_RESULT = {
  REVERT: 0n,
  SUCCESS: 1n,
}

export function buildOpcodeRangeObjects(
  start: number,
  end: number,
  name: string,
  runner: OpcodeRunner
): Runners {
  const rangeRunners: Runners = {}
  for (let i = start; i <= end; i++) rangeRunners[i] = { name, runner }
  return rangeRunners
}

export const parsers = {
  BytesIntoBigInt(bytes: Uint8Array): bigint {
    let array: string[] = []
    for (const byte of bytes) array.push(byte.toString(16).padStart(2, "0"))
    return BigInt("0x" + array.join(""))
  },
  BigIntIntoBytes(bigint: bigint, length: number): Buffer {
    const hex = bigint.toString(16).padStart(2 * length, "0")
    return Buffer.from(hex, "hex")
  },
  HexStringIntoBigInt(hex: string): bigint {
    if (!hex.startsWith("0x")) hex = hex.padStart(2 * hex.length + 2, "0x")
    return BigInt(hex)
  },
  BigintIntoHexString(bigint: bigint): string {
    return "0x" + bigint.toString(16)
  },
  hexStringToUint8Array(hexString: string): Uint8Array {
    return new Uint8Array(
      (hexString?.match(/../g) || []).map((byte) => parseInt(byte, 16))
    )
  },
  BufferToHexString(buffer: Buffer): string {
    return "0x" + buffer.toString("hex")
  },
}

// https://stackoverflow.com/questions/51867270
export const bigMath = {
  abs(x: bigint): bigint {
    return x < 0n ? -x : x
  },
  sign(x: bigint): bigint {
    if (x === 0n) return 0n
    return x < 0n ? -1n : 1n
  },
  pow(base: bigint, exponent: bigint): bigint {
    return base ** exponent
  },
  min(value: bigint, ...values: bigint[]): bigint {
    for (const v of values) if (v < value) value = v
    return value
  },
  max(value: bigint, ...values: bigint[]): bigint {
    for (const v of values) if (v > value) value = v
    return value
  },
  toSigned256(x: bigint): bigint {
    return BigInt.asIntN(256, x)
  },
  toUnsigned256(x: bigint): bigint {
    return BigInt.asUintN(256, x)
  },
  mod256(x: bigint): bigint {
    const mod = x % MAX_256_BITS
    return mod < 0n ? mod + MAX_256_BITS : mod
  },
  ceil(x: bigint, ceil: bigint): bigint {
    const mod = x % ceil
    return mod === 0n ? x : x + ceil - mod
  },
}
