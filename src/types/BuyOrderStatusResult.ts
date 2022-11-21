export interface BuyOrderStatusResult {
  success: boolean
  active: boolean
  purchased: number
  quantity: number
  quantityRemaining: number
  purchases: []
}
