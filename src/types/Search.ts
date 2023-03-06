import { type SearchResponse } from './SearchResponse.js'
import { type SearchResult } from './SearchResult.js'

export interface Search {
  _data: SearchResponse
  success: boolean
  start: number
  pageSize: number
  totalCount: number
  searchData: {
    query: string
    searchDescriptions: boolean
    totalCount: number
    pageSize: number
    prefix: string
    classPrefix: string
  }
  results: SearchResult[]
}
