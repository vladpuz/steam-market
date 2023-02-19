import { type BuyOrderStatusResponse } from './BuyOrderStatusResponse.js'

export interface BuyOrderStatus {
  _data: BuyOrderStatusResponse
  success: boolean
  active: boolean
  purchased: number
  quantity: number
  quantityRemaining: number
  purchases: []
}
