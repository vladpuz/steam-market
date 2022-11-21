export interface SearchOptions {
  query?: string | null
  start?: number | null
  count?: number | null
  searchDescriptions?: boolean | null
  sortColumn?: string | null
  sortDir?: 'desc' | 'asc' | null
}
