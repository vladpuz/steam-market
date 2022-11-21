import { AssetResult } from './AssetResult'
import { ListingResult } from './ListingResult'
import { BuyOrderResult } from './BuyOrderResult'

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
