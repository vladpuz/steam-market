export interface BuyOrderStatusResponse {
  success: number
  active: number
  purchased: number
  quantity: number
  quantity_remaining: number
  purchases: []
}
