import { AssetResponse } from './AssetResponse.js'
import { ListingResponse } from './ListingResponse.js'
import { EventResponse } from './EventResponse.js'
import { PurchaseResponse } from './PurchaseResponse.js'

export interface MyHistoryResponse {
  success: boolean
  pagesize: number
  total_count: number
  start: number
  assets: Record<string, Record<string, Record<string, AssetResponse>>>
  events: EventResponse[]
  purchases: Record<string, PurchaseResponse>
  listings: Record<string, ListingResponse>
}
