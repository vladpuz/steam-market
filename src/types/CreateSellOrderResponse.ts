export interface CreateSellOrderResponse {
  success: boolean
  requires_confirmation: number
  needs_mobile_confirmation: boolean
  needs_email_confirmation: boolean
  email_domain: string
}
