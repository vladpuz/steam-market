export interface PriceHistory {
  success: boolean
  pricePrefix: string
  priceSuffix: string
  prices: Array<{
    datetime: string
    price: number
    volume: number
  }>
}
