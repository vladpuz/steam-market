import { type PriceHistoryResponse } from './PriceHistoryResponse.js'

export interface PriceHistory {
  _data: PriceHistoryResponse
  success: boolean
  pricePrefix: string
  priceSuffix: string
  prices: Array<{
    datetime: string
    price: number
    volume: number
  }>
}
