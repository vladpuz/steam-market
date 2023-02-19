import { type PriceOverviewResponse } from './PriceOverviewResponse.js'

export interface PriceOverview {
  _data: PriceOverviewResponse
  success: boolean
  lowestPrice: string
  volume: number
  medianPrice: string
}
