import axios from 'axios'
import proxyParser from 'proxy-string-parser'
import ISO4217 from 'currency-codes'
import ISO6391 from 'iso-639-1'
import { ECurrencyCode } from './types/ECurrencyCode.js'
import { type MarketOptions } from './types/MarketOptions.js'
import { type SearchOptions } from './types/SearchOptions.js'
import { type CreateBuyOrderOptions } from './types/CreateBuyOrderOptions.js'
import { type CreateSellOrderOptions } from './types/CreateSellOrderOptions.js'
import { type Search } from './types/Search.js'
import { type ItemNameId } from './types/ItemNameId.js'
import { type ItemOrdersHistogram } from './types/ItemOrdersHistogram.js'
import { type PriceOverview } from './types/PriceOverview.js'
import { type PriceHistory } from './types/PriceHistory.js'
import { type MyListings } from './types/MyListings.js'
import { type MyHistory } from './types/MyHistory.js'
import { type CreateBuyOrder } from './types/CreateBuyOrder.js'
import { type CreateSellOrder } from './types/CreateSellOrder.js'
import { type BuyOrderStatus } from './types/BuyOrderStatus.js'
import { type SearchResponse } from './types/SearchResponse.js'
import { type ItemNameIdResponse } from './types/ItemNameIdResponse.js'
import { type ItemOrdersHistogramResponse } from './types/ItemOrdersHistogramResponse.js'
import { type PriceOverviewResponse } from './types/PriceOverviewResponse.js'
import { type PriceHistoryResponse } from './types/PriceHistoryResponse.js'
import { type MyListingsResponse } from './types/MyListingsResponse.js'
import { type MyHistoryResponse } from './types/MyHistoryResponse.js'
import { type CreateBuyOrderResponse } from './types/CreateBuyOrderResponse.js'
import { type CreateSellOrderResponse } from './types/CreateSellOrderResponse.js'
import { type BuyOrderStatusResponse } from './types/BuyOrderStatusResponse.js'
import { type Asset } from './types/Asset.js'
import { type Listing } from './types/Listing.js'
import { type AssetResponse } from './types/AssetResponse.js'
import { type ListingResponse } from './types/ListingResponse.js'

class SteamMarket {
  private readonly server
  private sessionId = ''
  private currency = ECurrencyCode.USD
  private digits = 2
  private units = 100
  private country = 'US'
  private language = 'english'
  private vanityURL = ''

  public constructor (options?: MarketOptions | null) {
    const { additionalHeaders, httpProxy, socksProxy } = options ?? {}
    const proxy = httpProxy ?? socksProxy

    if ((httpProxy != null) && (socksProxy != null)) {
      throw new Error('Cannot specify both socksProxy and httpProxy options')
    }

    this.server = axios.create({
      baseURL: 'https://steamcommunity.com/market',
      headers: {
        Host: 'steamcommunity.com',
        Accept: 'text/html,*/*;q=0.9',
        'Accept-Encoding': 'gzip,identity,*;q=0',
        'Accept-Charset': 'ISO-8859-1,utf-8,*;q=0.7',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
        ...additionalHeaders
      },
      proxy: (proxy != null) ? proxyParser(proxy) : false
    })
  }

  private processAsset (asset: AssetResponse): Asset {
    return {
      currency: asset.currency,
      appId: asset.appid,
      contextId: Number(asset.contextid),
      id: Number(asset.id),
      classId: Number(asset.classid),
      instanceId: Number(asset.instanceid),
      amount: Number(asset.amount),
      status: asset.status,
      originalAmount: Number(asset.original_amount),
      unownedId: Number(asset.unowned_id),
      unownedContextId: Number(asset.unowned_contextid),
      backgroundColor: asset.background_color,
      iconUrl: asset.icon_url,
      iconUrlLarge: asset.icon_url_large,
      descriptions: asset.descriptions,
      tradable: Boolean(asset.tradable),
      actions: asset.actions,
      ownerDescriptions: asset.owner_descriptions,
      ownerActions: asset.owner_actions,
      fraudWarnings: asset.fraudwarnings,
      name: asset.name,
      nameColor: asset.name_color,
      type: asset.type,
      marketName: asset.market_name,
      marketHashName: asset.market_hash_name,
      marketFee: asset.market_fee,
      marketFeeApp: asset.market_fee_app,
      containedItem: asset.contained_item,
      marketActions: asset.market_actions,
      commodity: Boolean(asset.commodity),
      marketTradableRestriction: asset.market_tradable_restriction,
      marketMarketableRestriction: asset.market_marketable_restriction,
      marketable: Boolean(asset.marketable),
      tags: asset.tags,
      itemExpiration: asset.item_expiration,
      marketBuyCountryRestriction: asset.market_buy_country_restriction,
      marketSellCountryRestriction: asset.market_sell_country_restriction,
      appIcon: asset.app_icon,
      owner: Boolean(asset.owner)
    }
  }

  private processAssets (assets: Record<string, Record<string, Record<string, AssetResponse>>>): Asset[] {
    const array: Asset[] = []

    Object.values(assets).forEach((i) => {
      Object.values(i).forEach((j) => {
        Object.values(j).forEach((k) => {
          array.push(this.processAsset(k))
        })
      })
    })

    return array
  }

  private processListing (listing: ListingResponse): Listing {
    return {
      listingId: Number(listing.listingid),
      timeCreated: listing.time_created,
      asset: this.processAsset(listing.asset),
      steamIdLister: Number(listing.steamid_lister),
      price: listing.price,
      originalPrice: listing.original_price,
      fee: listing.fee,
      currencyId: Number(listing.currencyid),
      convertedPrice: listing.converted_price,
      convertedFee: listing.converted_fee,
      convertedCurrencyId: Number(listing.converted_currencyid),
      status: listing.status,
      active: listing.active,
      steamFee: listing.steam_fee,
      convertedSteamFee: listing.converted_steam_fee,
      publisherFee: listing.publisher_fee,
      convertedPublisherFee: listing.converted_publisher_fee,
      publisherFeePercent: Number(listing.publisher_fee_percent),
      publisherFeeApp: listing.publisher_fee_app,
      cancelReason: listing.cancel_reason,
      itemExpired: listing.item_expired,
      originalAmountListed: listing.original_amount_listed,
      originalPricePerUnit: listing.original_price_per_unit,
      feePerUnit: listing.fee_per_unit,
      steamFeePerUnit: listing.steam_fee_per_unit,
      publisherFeePerUnit: listing.publisher_fee_per_unit,
      convertedPricePerUnit: listing.converted_price_per_unit,
      convertedFeePerUnit: listing.converted_fee_per_unit,
      convertedSteamFeePerUnit: listing.converted_steam_fee_per_unit,
      convertedPublisherFeePerUnit: listing.converted_publisher_fee_per_unit,
      timeFinishHold: listing.time_finish_hold,
      timeCreatedStr: listing.time_created_str
    }
  }

  public setCookies (cookies: string[]): void {
    const sessionId = cookies.find((cookie) => cookie.split('=')[0] === 'sessionid')

    if (sessionId == null) {
      throw new Error('Invalid cookies value')
    }

    this.sessionId = sessionId.split('=')[1]
    this.server.defaults.headers.common.Cookie = cookies.join('; ')
  }

  public setCurrency (currency: ECurrencyCode): void {
    const info = ISO4217.code(ECurrencyCode[currency])

    if (info == null) {
      throw new Error('Invalid currency value')
    }

    this.units = Number(`1${'0'.repeat(info.digits)}`)
    this.digits = info.digits
    this.currency = currency
  }

  public setCountry (country: string): void {
    const language = ISO6391.getName(country.toLowerCase())

    if (language === '') {
      throw new Error('Invalid country value')
    }

    this.language = language.toLowerCase()
    this.country = country
  }

  public setVanityURL (vanityURL: string): void {
    this.vanityURL = vanityURL
  }

  public getCookies (): string[] {
    return this.server.defaults.headers.common.Cookie?.toString().split('; ') ?? []
  }

  public getSessionId (): string {
    return this.sessionId
  }

  public getCurrency (): ECurrencyCode {
    return this.currency
  }

  public getDigits (): number {
    return this.digits
  }

  public getUnits (): number {
    return this.units
  }

  public getCountry (): string {
    return this.country
  }

  public getLanguage (): string {
    return this.language
  }

  public getVanityURL (): string {
    return this.vanityURL
  }

  public async search (appId: number, options?: SearchOptions | null): Promise<Search> {
    const { query, start, count, searchDescriptions, sortColumn, sortDir } = options ?? {}

    const response = await this.server.get<SearchResponse>('/search/render', {
      params: {
        query: query ?? '',
        start: start ?? '0',
        count: count ?? '100',
        search_descriptions: (searchDescriptions === true) ? '1' : '0',
        sort_column: sortColumn ?? 'popular',
        sort_dir: sortDir ?? 'desc',
        appid: appId,
        norender: '1'
      },
      headers: {
        Referer: `https://steamcommunity.com/market/search?appid=${appId}`,
        'X-Prototype-Version': '1.7',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    return {
      _data: response.data,
      success: response.data.success,
      start: response.data.start,
      pageSize: response.data.pagesize,
      totalCount: response.data.total_count,
      searchData: {
        query: response.data.searchdata.query,
        searchDescriptions: response.data.searchdata.search_descriptions,
        totalCount: response.data.searchdata.total_count,
        pageSize: response.data.searchdata.pagesize,
        prefix: response.data.searchdata.prefix,
        classPrefix: response.data.searchdata.class_prefix
      },
      results: response.data.results.map((result) => ({
        name: result.name,
        hashName: result.hash_name,
        sellListings: result.sell_listings,
        sellPrice: result.sell_price,
        sellPriceText: result.sell_price_text,
        appIcon: result.app_icon,
        appName: result.app_name,
        assetDescription: {
          appId: result.asset_description.appid,
          classId: result.asset_description.classid,
          instanceId: result.asset_description.instanceid,
          backgroundColor: result.asset_description.background_color,
          iconUrl: result.asset_description.icon_url,
          tradable: Boolean(result.asset_description.tradable),
          name: result.asset_description.name,
          nameColor: result.asset_description.name_color,
          type: result.asset_description.type,
          marketName: result.asset_description.market_name,
          marketHashName: result.asset_description.market_hash_name,
          commodity: Boolean(result.asset_description.commodity)
        },
        salePriceText: result.sale_price_text
      }
      ))
    }
  }

  public async itemNameId (appId: number, marketHashName: string): Promise<ItemNameId> {
    const response = await this.server.get<ItemNameIdResponse>(`/listings/${appId}/${marketHashName}`, {
      headers: {
        Cookie: this.getCookies().filter((cookie) => cookie.split('=')[0] === 'steamLogin').join('; '),
        Referer: `https://steamcommunity.com/market/search?appid=${appId}`
      }
    })

    const startString = 'Market_LoadOrderSpread('
    const endString = ')'
    const startPosition = response.data.indexOf(startString, 0)
    const endPosition = response.data.indexOf(endString, startPosition)

    if (startPosition === -1 || endPosition === -1) {
      throw new Error('Value itemNameId not found')
    }

    const itemNameId = response.data.slice(startPosition + startString.length, endPosition).trim()

    return {
      _data: response.data,
      value: Number(itemNameId)
    }
  }

  public async itemOrdersHistogram (
    appId: number,
    marketHashName: string,
    itemNameId: number
  ): Promise<ItemOrdersHistogram> {
    const response = await this.server.get<ItemOrdersHistogramResponse>('/itemordershistogram', {
      params: {
        country: this.country,
        language: this.language,
        currency: this.currency,
        item_nameid: itemNameId,
        two_factor: '0'
      },
      headers: {
        Referer: `https://steamcommunity.com/market/listings/${appId}/${marketHashName}`,
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    return {
      _data: response.data,
      success: Boolean(response.data.success),
      sellOrderTable: response.data.sell_order_table,
      sellOrderSummary: response.data.sell_order_summary,
      buyOrderTable: response.data.buy_order_table,
      buyOrderSummary: response.data.buy_order_summary,
      highestBuyOrder: Number((Number(response.data.highest_buy_order) / this.units).toFixed(this.digits)),
      lowestSellOrder: Number((Number(response.data.lowest_sell_order) / this.units).toFixed(this.digits)),
      buyOrderGraph: response.data.buy_order_graph.map((buyOrder) => ({
        price: buyOrder[0],
        volume: buyOrder[1],
        description: buyOrder[2]
      })),
      sellOrderGraph: response.data.sell_order_graph.map((sellOrder) => ({
        price: sellOrder[0],
        volume: sellOrder[1],
        description: sellOrder[2]
      })),
      graphMaxY: response.data.graph_max_y,
      graphMinX: response.data.graph_min_x,
      graphMaxX: response.data.graph_max_x,
      pricePrefix: response.data.price_prefix,
      priceSuffix: response.data.price_suffix
    }
  }

  public async priceOverview (appId: number, marketHashName: string): Promise<PriceOverview> {
    const response = await this.server.get<PriceOverviewResponse>('/priceoverview', {
      params: {
        appid: appId,
        currency: this.currency,
        market_hash_name: marketHashName
      },
      headers: {
        Referer: `https://steamcommunity.com/id/${this.vanityURL}/inventory?modal=1&market=1`,
        'X-Prototype-Version': '1.7',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    return {
      _data: response.data,
      success: response.data.success,
      lowestPrice: response.data.lowest_price,
      volume: Number(response.data.volume.split(',').join('')),
      medianPrice: response.data.median_price
    }
  }

  public async priceHistory (appId: number, marketHashName: string): Promise<PriceHistory> {
    const response = await this.server.get<PriceHistoryResponse>('/pricehistory', {
      params: {
        appid: appId,
        currency: this.currency,
        market_hash_name: marketHashName
      },
      headers: {
        Referer: `https://steamcommunity.com/id/${this.vanityURL}/inventory?modal=1&market=1`,
        'X-Prototype-Version': '1.7',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    return {
      _data: response.data,
      success: response.data.success,
      pricePrefix: response.data.price_prefix,
      priceSuffix: response.data.price_suffix,
      prices: response.data.prices.map((price) => ({
        datetime: price[0],
        price: price[1],
        volume: Number(price[2])
      }))
    }
  }

  public async myListings (start?: number | null, count?: number | null): Promise<MyListings> {
    const response = await this.server.get<MyListingsResponse>('/mylistings', {
      params: {
        start: start ?? '0',
        count: count ?? '100',
        norender: '1'
      },
      headers: {
        Referer: 'https://steamcommunity.com/market',
        'X-Prototype-Version': '1.7',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    return {
      _data: response.data,
      success: response.data.success,
      pageSize: response.data.pagesize,
      totalCount: response.data.total_count,
      assets: this.processAssets(response.data.assets),
      start: response.data.start,
      numActiveListings: response.data.num_active_listings,
      listings: response.data.listings.map((listing) => this.processListing(listing)),
      listingsOnHold: response.data.listings_on_hold.map((listing) => this.processListing(listing)),
      listingsToConfirm: response.data.listings_to_confirm.map((listing) => this.processListing(listing)),
      buyOrders: response.data.buy_orders.map((buyOrder) => ({
        appId: buyOrder.appid,
        hashName: buyOrder.hash_name,
        walletCurrency: buyOrder.wallet_currency,
        price: Number(buyOrder.price),
        quantity: Number(buyOrder.quantity),
        quantityRemaining: Number(buyOrder.quantity_remaining),
        buyOrderId: Number(buyOrder.buy_orderid),
        description: this.processAsset(buyOrder.description)
      }))
    }
  }

  public async myHistory (start?: number | null, count?: number | null): Promise<MyHistory> {
    const response = await this.server.get<MyHistoryResponse>('/myhistory', {
      params: {
        start: start ?? '0',
        count: count ?? '100',
        norender: '1'
      },
      headers: {
        Referer: 'https://steamcommunity.com/market',
        'X-Prototype-Version': '1.7',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    return {
      _data: response.data,
      success: response.data.success,
      pageSize: response.data.pagesize,
      totalCount: response.data.total_count,
      start: response.data.start,
      assets: this.processAssets(response.data.assets),
      events: response.data.events.map((event) => ({
        listingId: Number(event.listingid),
        purchaseId: Number(event.purchaseid),
        eventType: event.event_type,
        timeEvent: event.time_event,
        timeEventFraction: event.time_event_fraction,
        steamIdActor: Number(event.steamid_actor),
        dateEvent: event.date_event
      })),
      purchases: Object.values(response.data.purchases).map((purchase) => ({
        listingId: Number(purchase.listingid),
        purchaseId: Number(purchase.purchaseid),
        timeSold: purchase.time_sold,
        steamIdPurchaser: Number(purchase.steamid_purchaser),
        needsRollback: purchase.needs_rollback,
        failed: purchase.failed,
        asset: this.processAsset(purchase.asset),
        paidAmount: purchase.paid_amount,
        paidFee: purchase.paid_fee,
        currencyId: Number(purchase.currencyid),
        steamFee: purchase.steam_fee,
        publisherFee: purchase.publisher_fee,
        publisherFeePercent: Number(purchase.publisher_fee_percent),
        publisherFeeApp: purchase.publisher_fee_app,
        receivedAmount: purchase.received_amount,
        receivedCurrencyId: Number(purchase.received_currencyid),
        fundsReturned: purchase.funds_returned,
        avatarActor: purchase.avatar_actor,
        personaActor: purchase.persona_actor,
        fundsHeld: purchase.funds_held,
        timeFundsHeldUntil: purchase.time_funds_held_until,
        fundsRevoked: purchase.funds_revoked
      })),
      listings: Object.values(response.data.listings).map((listing) => this.processListing(listing))
    }
  }

  public async createBuyOrder (appId: number, options: CreateBuyOrderOptions): Promise<CreateBuyOrder> {
    const { marketHashName, price, amount } = options

    const response = await this.server.post<CreateBuyOrderResponse>('/createbuyorder', {
      sessionid: this.sessionId,
      currency: this.currency,
      appid: appId,
      market_hash_name: marketHashName,
      price_total: Number((price * amount) / this.units).toFixed(this.digits),
      quantity: amount,
      billing_state: '',
      save_my_address: '0'
    }, {
      headers: {
        Referer: `https://steamcommunity.com/market/listings/${appId}/${marketHashName}`,
        Origin: 'https://steamcommunity.com',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })

    return {
      _data: response.data,
      success: Boolean(response.data.success),
      buyOrderId: Number(response.data.buy_orderid)
    }
  }

  public async createSellOrder (appId: number, options: CreateSellOrderOptions): Promise<CreateSellOrder> {
    const { assetId, contextId, price, amount } = options

    const response = await this.server.post<CreateSellOrderResponse>('/sellitem', {
      sessionid: this.sessionId,
      appid: appId,
      contextid: contextId,
      assetid: assetId,
      amount,
      price: Number((price * this.units).toFixed(this.digits))
    }, {
      headers: {
        Referer: `https://steamcommunity.com/id/${this.vanityURL}/inventory?modal=1&market=1`,
        Origin: 'https://steamcommunity.com',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })

    return {
      _data: response.data,
      success: response.data.success,
      requiresConfirmation: Boolean(response.data.requires_confirmation),
      needsMobileConfirmation: response.data.needs_mobile_confirmation,
      needsEmailConfirmation: response.data.needs_email_confirmation,
      emailDomain: response.data.email_domain
    }
  }

  public async buyOrderStatus (
    appId: number,
    marketHashName: string,
    buyOrderId: number
  ): Promise<BuyOrderStatus> {
    const response = await this.server.get<BuyOrderStatusResponse>('/getbuyorderstatus', {
      params: {
        sessionid: this.sessionId,
        buy_orderid: buyOrderId
      },
      headers: {
        Referer: `https://steamcommunity.com/market/listings/${appId}/${marketHashName}`,
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    return {
      _data: response.data,
      success: Boolean(response.data.success),
      active: Boolean(response.data.active),
      purchased: response.data.purchased,
      quantity: response.data.quantity,
      quantityRemaining: response.data.quantity_remaining,
      purchases: response.data.purchases
    }
  }

  public async cancelBuyOrder (buyOrderId: number): Promise<null> {
    const response = await this.server.post<null>('/cancelbuyorder', {
      sessionid: this.sessionId,
      buy_orderid: buyOrderId
    }, {
      headers: {
        Referer: 'https://steamcommunity.com/market',
        Origin: 'https://steamcommunity.com',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Prototype-Version': '1.7',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    return response.data
  }

  public async cancelSellOrder (listingId: number): Promise<[]> {
    const response = await this.server.post<[]>(`/removelisting/${listingId}`, {
      sessionid: this.sessionId
    }, {
      headers: {
        Referer: 'https://steamcommunity.com/market',
        Origin: 'https://steamcommunity.com',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Prototype-Version': '1.7',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    return response.data
  }
}

export default SteamMarket
