import { type Asset } from './Asset.js'

export interface Listing {
  listingId: number
  timeCreated?: number | null
  asset: Asset
  steamIdLister?: number | null
  price: number
  originalPrice: number
  fee: number
  currencyId: number
  convertedPrice?: number | null
  convertedFee?: number | null
  convertedCurrencyId?: number | null
  status?: number | null
  active?: number | null
  steamFee?: number | null
  convertedSteamFee?: number | null
  publisherFee?: number | null
  convertedPublisherFee?: number | null
  publisherFeePercent: number
  publisherFeeApp: number
  cancelReason?: string | null
  cancelReasonShort?: string | null
  itemExpired?: number | null
  originalAmountListed?: number | null
  originalPricePerUnit?: number | null
  feePerUnit?: number | null
  steamFeePerUnit?: number | null
  publisherFeePerUnit?: number | null
  convertedPricePerUnit?: number | null
  convertedFeePerUnit?: number | null
  convertedSteamFeePerUnit?: number | null
  convertedPublisherFeePerUnit?: number | null
  timeFinishHold?: number | null
  timeCreatedStr?: string | null
}
