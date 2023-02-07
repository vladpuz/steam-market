import { Asset } from './Asset.js'

export interface Purchase {
  listingId: number
  purchaseId: number
  timeSold: number
  steamIdPurchaser: number
  needsRollback: number
  failed: number
  asset: Asset
  paidAmount: number
  paidFee: number
  currencyId: number
  steamFee: number
  publisherFee: number
  publisherFeePercent: number
  publisherFeeApp: number
  receivedAmount: number
  receivedCurrencyId: number
  fundsReturned: number
  avatarActor: string
  personaActor: string
  fundsHeld?: number | null
  timeFundsHeldUntil?: number | null
  fundsRevoked?: number | null
}
