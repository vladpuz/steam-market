import { type Description } from './Description.js'
import { type Action } from './Action.js'

export interface AssetResponse {
  currency?: number | null
  appid: number
  contextid?: string | null
  id?: string | null
  classid: string
  instanceid: string
  amount?: string | null
  status?: number | null
  original_amount?: string | null
  unowned_id?: string | null
  unowned_contextid?: string | null
  background_color: string
  icon_url: string
  icon_url_large: string
  descriptions: Description[]
  tradable: number
  actions?: Action[] | null
  owner_descriptions?: Description[] | null
  owner_actions?: Action[] | null
  fraudwarnings?: [] | null
  name: string
  name_color?: string | null
  type: string
  market_name: string
  market_hash_name: string
  market_fee?: number | null
  market_fee_app?: number | null
  contained_item?: null
  market_actions?: Action[] | null
  commodity: number
  market_tradable_restriction: number
  market_marketable_restriction?: number | null
  marketable: number
  tags?: [] | null
  item_expiration?: null
  market_buy_country_restriction?: null
  market_sell_country_restriction?: null
  app_icon?: string | null
  owner?: number | null
  rollback_new_id?: string | null
  rollback_new_contextid?: string | null
  new_id?: string | null
  new_contextid?: string | null
}
