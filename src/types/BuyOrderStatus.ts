export interface BuyOrderStatus {
  success: boolean
  active: boolean
  purchased: number
  quantity: number
  quantityRemaining: number
  purchases: []
}
