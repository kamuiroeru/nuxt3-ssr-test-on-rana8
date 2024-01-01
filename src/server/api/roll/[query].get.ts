import { parseRollQuery, TokenizerError } from '@/server/services/tokenizer'
import { rollDice } from '@/server/services/dice'
import type { DiceType } from '@/domain/dice'
import { sleepMs } from '~/utils/sleep'

type Response = {
  query: string,
  parseResult: DiceType[],
  diceResults: number[],
  total: number,
}

export default defineEventHandler(async (event) => {
  const query = getRouterParam(event, 'query') as string // Always exists, because `query` is path parameter.
  try {
    const parseResult = parseRollQuery(query)
    await sleepMs(1000)
    const diceResults = parseResult.map(dt => rollDice(dt))
    return {
      query,
      parseResult,
      diceResults,
      total: diceResults.reduce((a, k) => a + k)
    } as Response
  } catch (err) {
    if (err instanceof TokenizerError) {
      throw createError({
        statusCode: 400,
        statusMessage: err.message
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})
