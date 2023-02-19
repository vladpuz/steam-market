import { type ItemOrdersHistogramResponse } from './ItemOrdersHistogramResponse.js'

export interface ItemOrdersHistogram {
  _data: ItemOrdersHistogramResponse
  success: boolean
  sellOrderTable: string
  sellOrderSummary: string
  buyOrderTable: string
  buyOrderSummary: string
  highestBuyOrder: number
  lowestSellOrder: number
  buyOrderGraph: Array<{
    price: number
    volume: number
    description: string
  }>
  sellOrderGraph: Array<{
    price: number
    volume: number
    description: string
  }>
  graphMaxY: number
  graphMinX: number
  graphMaxX: number
  pricePrefix: string
  priceSuffix: string
}
