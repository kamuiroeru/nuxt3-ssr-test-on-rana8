import { randomInt } from 'crypto'
import { DiceType, diceTypeMapper } from '~/domain/dice'

/**
 * 1〜max の間のランダム値を返す
 * @param max 最大値（これを含む）
 */
export const generateUInt = (max: number): number => {
  return randomInt(max) + 1
}

export const rollDice = (diceType: DiceType): number => generateUInt(diceTypeMapper[diceType])
