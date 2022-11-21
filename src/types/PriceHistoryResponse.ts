export interface PriceHistoryResponse {
  success: boolean
  price_prefix: string
  price_suffix: string
  prices: Array<[string, number, string]>
}
