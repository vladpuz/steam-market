import { type ListingsResponse } from './ListingsResponse.js'
import { type PriceHistory } from './PriceHistory.js'

export interface Listings {
  _data: ListingsResponse
  itemNameId: () => Promise<number>
  priceHistory: () => Promise<PriceHistory<string>>
}
