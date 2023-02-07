export interface Event {
  listingId: number
  purchaseId?: number | null
  eventType: number
  timeEvent: number
  timeEventFraction: number
  steamIdActor: number
  dateEvent: string
}
