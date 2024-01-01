import { diceTypeMapper, type DiceType } from '@/domain/dice'
import { rollDice } from '@/server/services/dice'
import { sleepMs } from '~/utils/sleep'

type Request = {
  diceTypes: DiceType[],
}

type Response = Request & {
  diceResults: number[],
  total: number,
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Request>(event)
  if (typeof body === 'undefined') {
    throw createError({
      statusCode: 400,
      statusMessage: '"diceTypes" param is required.'
    })
  }
  const diceTypes = body.diceTypes

  // validate
  const isValid = Array.isArray(diceTypes) && diceTypes.every(dt => dt in diceTypeMapper)

  if (!isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid syntax. Required valid DiceTypes'
    })
  }

  await sleepMs(1000)
  const diceResults = diceTypes.map(dt => rollDice(dt))
  return {
    diceTypes,
    diceResults,
    total: diceResults.reduce((a, k) => a + k)
  } as Response
})
