import { AssetResult } from './AssetResult.js'

export interface BuyOrderResult {
  appId: number
  hashName: string
  walletCurrency: number
  price: number
  quantity: number
  quantityRemaining: number
  buyOrderId: number
  description: AssetResult
}
