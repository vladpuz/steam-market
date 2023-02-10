import { type AssetResponse } from './AssetResponse.js'
import { type ListingResponse } from './ListingResponse.js'
import { type EventResponse } from './EventResponse.js'
import { type PurchaseResponse } from './PurchaseResponse.js'

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
