import { type CreateSellOrderResponse } from './CreateSellOrderResponse.js'

export interface CreateSellOrder {
  _data: CreateSellOrderResponse
  success: boolean
  requiresConfirmation: boolean
  needsMobileConfirmation: boolean
  needsEmailConfirmation: boolean
  emailDomain: string
}
