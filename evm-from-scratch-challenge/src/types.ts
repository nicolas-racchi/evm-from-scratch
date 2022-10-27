export type ProgramCounter = number
export type Gas = bigint
export type Address = string
export type Value = bigint

export interface Code {
  asm: string
  bin: string
}

export interface Test {
  name: string
  code: Code
  tx?: Partial<TxData>
  block?: Partial<Block>
  state?: State
  expect: {
    success?: boolean
    stack: string[]
  }
}

export interface TxData {
  to: Address
  from: Address
  value: Value
  origin: Address
  gasprice: Gas
}

export interface State {
  [key: Address]: Account
}

export interface Account {
  balance?: Value
}

export interface Block {
  number: number
  timestamp: bigint
  coinbase: Address
  difficulty: bigint
  gaslimit: string
  chainid: number
}
