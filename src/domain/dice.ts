export const diceTypeMapper = {
  'D4': 4,
  'D6': 6,
  'D8': 8,
  'D10': 10,
  'D12': 12,
  'D20': 20,
} as const

export type DiceType = keyof typeof diceTypeMapper
export const numberToDiceType: Readonly<Record<number, DiceType>> = Object.fromEntries(Object.entries(diceTypeMapper).map(([k, v]) => [v, k as DiceType]))
