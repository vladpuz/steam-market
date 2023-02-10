import { type Asset } from './Asset.js'
import { type Listing } from './Listing.js'
import { type BuyOrder } from './BuyOrder.js'

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
