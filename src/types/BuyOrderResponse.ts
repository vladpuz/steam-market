import { AssetResponse } from './AssetResponse'

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
