export interface SearchResult {
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
}
