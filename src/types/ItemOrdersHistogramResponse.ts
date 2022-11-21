export interface ItemOrdersHistogramResponse {
  success: number
  sell_order_table: string
  sell_order_summary: string
  buy_order_table: string
  buy_order_summary: string
  highest_buy_order: string
  lowest_sell_order: string
  buy_order_graph: Array<[number, number, string]>
  sell_order_graph: Array<[number, number, string]>
  graph_max_y: number
  graph_min_x: number
  graph_max_x: number
  price_prefix: string
  price_suffix: string
}
