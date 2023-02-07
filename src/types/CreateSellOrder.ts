export interface CreateSellOrder {
  success: boolean
  requiresConfirmation: boolean
  needsMobileConfirmation: boolean
  needsEmailConfirmation: boolean
  emailDomain: string
}
