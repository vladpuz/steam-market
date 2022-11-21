export interface PriceHistoryResult {
  success: boolean
  pricePrefix: string
  priceSuffix: string
  prices: Array<{
    datetime: string
    price: number
    volume: number
  }>
}
