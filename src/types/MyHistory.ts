import { type Asset } from './Asset.js'
import { type Listing } from './Listing.js'
import { type Event } from './Event.js'
import { type Purchase } from './Purchase.js'

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
