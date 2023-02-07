import { Asset } from './Asset.js'

export interface BuyOrder {
  appId: number
  hashName: string
  walletCurrency: number
  price: number
  quantity: number
  quantityRemaining: number
  buyOrderId: number
  description: Asset
}
