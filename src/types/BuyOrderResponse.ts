import { type AssetResponse } from './AssetResponse.js'

export interface BuyOrderResponse {
  appid: number
  hash_name: string
  wallet_currency: number
  price: string
  quantity: string
  quantity_remaining: string
  buy_orderid: string
  description: AssetResponse
}
