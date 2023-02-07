import { Asset } from './Asset.js'
import { Listing } from './Listing.js'
import { BuyOrder } from './BuyOrder.js'

export interface MyListings {
  success: boolean
  pageSize: number
  totalCount: number
  assets: Asset[]
  start: number
  numActiveListings: number
  listings: Listing[]
  listingsOnHold: Listing[]
  listingsToConfirm: Listing[]
  buyOrders: BuyOrder[]
}
