import { AssetResult } from './AssetResult.js'

export interface ListingResult {
  listingId: number
  timeCreated: number
  asset: AssetResult
  steamIdLister: number
  price: number
  originalPrice: number
  fee: number
  currencyId: number
  convertedPrice: number
  convertedFee: number
  convertedCurrencyId: number
  status: number
  active: number
  steamFee: number
  convertedSteamFee: number
  publisherFee: number
  convertedPublisherFee: number
  publisherFeePercent: number
  publisherFeeApp: number
  cancelReason: number
  itemExpired: number
  originalAmountListed: number
  originalPricePerUnit: number
  feePerUnit: number
  steamFeePerUnit: number
  publisherFeePerUnit: number
  convertedPricePerUnit: number
  convertedFeePerUnit: number
  convertedSteamFeePerUnit: number
  convertedPublisherFeePerUnit: number
  timeFinishHold: number
  timeCreatedStr: string
}
