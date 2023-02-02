import { AssetResult } from './AssetResult.js'
import { ListingResult } from './ListingResult.js'
import { EventResult } from './EventResult.js'
import { PurchaseResult } from './PurchaseResult.js'

export interface MyHistoryResult {
  success: boolean
  pageSize: number
  totalCount: number
  start: number
  assets: AssetResult[]
  events: EventResult[]
  purchases: PurchaseResult[]
  listings: ListingResult[]
}
