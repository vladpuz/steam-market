import { type AssetResponse } from './AssetResponse.js'
import { type ListingResponse } from './ListingResponse.js'
import { type BuyOrderResponse } from './BuyOrderResponse.js'

export interface MyListingsResponse {
  success: boolean
  pagesize: number
  total_count: number
  assets: Record<string, Record<string, Record<string, AssetResponse>>>
  start: number
  num_active_listings: number
  listings: ListingResponse[]
  listings_on_hold: ListingResponse[]
  listings_to_confirm: ListingResponse[]
  buy_orders: BuyOrderResponse[]
}
