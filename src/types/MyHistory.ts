import { Asset } from './Asset.js'
import { Listing } from './Listing.js'
import { Event } from './Event.js'
import { Purchase } from './Purchase.js'

export interface MyHistory {
  success: boolean
  pageSize: number
  totalCount: number
  start: number
  assets: Asset[]
  events: Event[]
  purchases: Purchase[]
  listings: Listing[]
}
