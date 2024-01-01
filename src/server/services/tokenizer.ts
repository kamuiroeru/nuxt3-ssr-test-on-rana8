import { type DiceType, numberToDiceType } from '@/domain/dice'

export class TokenizerError extends Error {
  static {
    this.prototype.name = 'TokenizerError'
  }
}

const parseDiceType = (n: number): DiceType => {
  const diceType = numberToDiceType[n]
  if (typeof diceType === 'undefined') {
    throw new TokenizerError(`D${n} is invalid DiceType. DiceType is ${Object.values(numberToDiceType).join(' | ')}`)
  }
  return diceType
}

const parseNdk = (query: string): {n: number, k: number} => {
  query = query.toLowerCase()
  const splited = query.split('d')
  if (splited.length !== 2) {
    throw new TokenizerError(`Syntax Error. ${query} is not conform as 'NdK'. For example 3d4`)
  }
  const n = parseInt(splited[0])
  const k = parseInt(splited[1])
  if (isNaN(n) || n < 0) {
    throw new TokenizerError(`Value Error. N is must greater than 0 of NdK, query: ${query}.`)
  }
  if (isNaN(k)) {
    throw new TokenizerError(`Value Error. K is must number, query: ${query}.`)
  }
  return {n, k}
}

export const parseRollQuery = (query: string): DiceType[] => {
  const { n, k } = parseNdk(query)
  const diceType = parseDiceType(k)
  return new Array(n).fill(diceType)
}
