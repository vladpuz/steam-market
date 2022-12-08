import { AssetResult } from './AssetResult.js'
import { ListingResult } from './ListingResult.js'
import { BuyOrderResult } from './BuyOrderResult.js'

export interface MyListingsResult {
  success: boolean
  pageSize: number
  totalCount: number
  assets: AssetResult[]
  start: number
  numActiveListings: number
  listings: ListingResult[]
  listingsOnHold: ListingResult[]
  listingsToConfirm: ListingResult[]
  buyOrders: BuyOrderResult[]
}
