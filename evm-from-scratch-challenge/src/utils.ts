import { ZERO_ADDRESS } from "./constants"

import type { Test, TxData, State, Block } from "./types"

export function hexStringToUint8Array(hexString: string): Uint8Array {
  return new Uint8Array((hexString?.match(/../g) || []).map((byte) => parseInt(byte, 16)))
}

export function buildTxData(t: Test): TxData {
  return {
    to: t.tx?.to ?? ZERO_ADDRESS,
    from: t.tx?.from ?? ZERO_ADDRESS,
    value: BigInt(t.tx?.value ?? 0),
    origin: t.tx?.origin ?? t.tx?.from ?? ZERO_ADDRESS,
    gasprice: BigInt(t.tx?.gasprice ?? 0),
    data: Buffer.from(t.tx?.data ?? "", "hex"),
  }
}

export function buildState(t: Test): State {
  const state = {}
  if (!t.state) return state

  for (const address in t.state)
    state[address] = {
      balance: BigInt(t.state[address].balance || 0),
      code: hexStringToUint8Array(t.state[address].code?.bin || "0x00"),
    }

  return state
}

export function buildBlock(t: Test): Block {
  return {
    number: Number(t.block?.number || 0),
    timestamp: BigInt(t.block?.timestamp || 0n),
    coinbase: t.block?.coinbase || ZERO_ADDRESS,
    difficulty: BigInt(t.block?.difficulty || 0n),
    gaslimit: t.block?.gaslimit || "0x0",
    chainid: Number(t.block?.chainid || 0),
  }
}
