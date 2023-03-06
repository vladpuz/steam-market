import { type PriceResponse } from './PriceResponse.js'

export interface PriceHistoryResponse {
  success: boolean
  price_prefix: string
  price_suffix: string
  prices: PriceResponse[]
}
