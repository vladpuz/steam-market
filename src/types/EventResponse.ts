export interface EventResponse {
  listingid: string
  purchaseid?: string | null
  event_type: number
  time_event: number
  time_event_fraction: number
  steamid_actor: string
  date_event: string
}
