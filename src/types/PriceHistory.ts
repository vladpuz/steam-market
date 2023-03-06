import { type PriceHistoryResponse } from './PriceHistoryResponse.js'
import { type Price } from './Price.js'

export interface PriceHistory<T = PriceHistoryResponse> {
  _data: T
  success: boolean
  pricePrefix: string
  priceSuffix: string
  prices: Price[]
}
