import { type SearchResultResponse } from './SearchResultResponse.js'

export interface SearchResponse {
  success: boolean
  start: number
  pagesize: number
  total_count: number
  searchdata: {
    query: string
    search_descriptions: boolean
    total_count: number
    pagesize: number
    prefix: string
    class_prefix: string
  }
  results: SearchResultResponse[]
}
