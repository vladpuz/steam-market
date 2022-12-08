import { AssetResponse } from './AssetResponse.js'

export interface ListingResponse {
  listingid: string
  time_created: number
  asset: AssetResponse
  steamid_lister: string
  price: number
  original_price: number
  fee: number
  currencyid: string
  converted_price: number
  converted_fee: number
  converted_currencyid: string
  status: number
  active: number
  steam_fee: number
  converted_steam_fee: number
  publisher_fee: number
  converted_publisher_fee: number
  publisher_fee_percent: string
  publisher_fee_app: number
  cancel_reason: number
  item_expired: number
  original_amount_listed: number
  original_price_per_unit: number
  fee_per_unit: number
  steam_fee_per_unit: number
  publisher_fee_per_unit: number
  converted_price_per_unit: number
  converted_fee_per_unit: number
  converted_steam_fee_per_unit: number
  converted_publisher_fee_per_unit: number
  time_finish_hold: number
  time_created_str: string
}
