import { type AssetResponse } from './AssetResponse.js'

export interface ListingResponse {
  listingid: string
  time_created?: number | null
  asset: AssetResponse
  steamid_lister?: string | null
  price: number
  original_price: number
  fee: number
  currencyid: string
  converted_price?: number | null
  converted_fee?: number | null
  converted_currencyid?: string | null
  status?: number | null
  active?: number | null
  steam_fee?: number | null
  converted_steam_fee?: number | null
  publisher_fee?: number | null
  converted_publisher_fee?: number | null
  publisher_fee_percent: string
  publisher_fee_app: number
  cancel_reason?: string | null
  cancel_reason_short?: string | null
  item_expired?: number | null
  original_amount_listed?: number | null
  original_price_per_unit?: number | null
  fee_per_unit?: number | null
  steam_fee_per_unit?: number | null
  publisher_fee_per_unit?: number | null
  converted_price_per_unit?: number | null
  converted_fee_per_unit?: number | null
  converted_steam_fee_per_unit?: number | null
  converted_publisher_fee_per_unit?: number | null
  time_finish_hold?: number | null
  time_created_str?: string | null
}
