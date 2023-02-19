import { type CreateBuyOrderResponse } from './CreateBuyOrderResponse.js'

export interface CreateBuyOrder {
  _data: CreateBuyOrderResponse
  success: boolean
  buyOrderId: number
}
