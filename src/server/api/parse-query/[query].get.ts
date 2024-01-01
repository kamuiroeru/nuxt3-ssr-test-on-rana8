import { parseRollQuery, TokenizerError } from '@/server/services/tokenizer'
import type { DiceType } from '@/domain/dice'

type Response = {
  query: string,
  result: DiceType[],
}

export default defineEventHandler(async (event) => {
  const query = getRouterParam(event, 'query') as string // Always exists, because `query` is path parameter.
  try {
    return {
      query,
      result: parseRollQuery(query),
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
