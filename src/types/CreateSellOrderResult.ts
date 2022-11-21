export interface CreateSellOrderResult {
  success: boolean
  requiresConfirmation: boolean
  needsMobileConfirmation: boolean
  needsEmailConfirmation: boolean
  emailDomain: string
}
