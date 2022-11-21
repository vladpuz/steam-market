import { AssetResponse } from './AssetResponse'
import { ListingResponse } from './ListingResponse'
import { BuyOrderResponse } from './BuyOrderResponse'

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
