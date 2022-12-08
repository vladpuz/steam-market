import { Description } from './Description.js'
import { Action } from './Action.js'

export interface AssetResult {
  currency?: number | null
  appId: number
  contextId?: number | null
  id?: number | null
  classId: number
  instanceId: number
  amount?: number | null
  status?: number | null
  originalAmount?: number | null
  unownedId?: number | null
  unownedContextId?: number | null
  backgroundColor: string
  iconUrl: string
  iconUrlLarge: string
  descriptions: Description[]
  tradable: boolean
  actions?: Action[] | null
  ownerDescriptions?: Description[] | null
  ownerActions?: Action[] | null
  fraudWarnings?: [] | null
  name: string
  nameColor?: string | null
  type: string
  marketName: string
  marketHashName: string
  marketFee?: number | null
  marketFeeApp?: number | null
  containedItem?: null
  marketActions?: Action[] | null
  commodity: boolean
  marketTradableRestriction: number
  marketMarketableRestriction?: number | null
  marketable: boolean
  tags?: [] | null
  itemExpiration?: null
  marketBuyCountryRestriction?: null
  marketSellCountryRestriction?: null
  appIcon?: string | null
  owner?: boolean | null
}
