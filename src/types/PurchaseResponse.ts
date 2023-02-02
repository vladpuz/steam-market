import { AssetResponse } from './AssetResponse.js'

export interface PurchaseResponse {
  listingid: string
  purchaseid: string
  time_sold: number
  steamid_purchaser: string
  needs_rollback: number
  failed: number
  asset: AssetResponse
  paid_amount: number
  paid_fee: number
  currencyid: string
  steam_fee: number
  publisher_fee: number
  publisher_fee_percent: string
  publisher_fee_app: number
  received_amount: number
  received_currencyid: string
  funds_returned: number
  avatar_actor: string
  persona_actor: string
  funds_held?: number | null
  time_funds_held_until?: number | null
  funds_revoked?: number | null
}
