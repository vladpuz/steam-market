export interface SearchResult {
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
  results: Array<{
    name: string
    hashName: string
    sellListings: number
    sellPrice: number
    sellPriceText: string
    appIcon: string
    appName: string
    assetDescription: {
      appId: number
      classId: string
      instanceId: string
      backgroundColor: string
      iconUrl: string
      tradable: boolean
      name: string
      nameColor: string
      type: string
      marketName: string
      marketHashName: string
      commodity: boolean
    }
    salePriceText: string
  }>
}
