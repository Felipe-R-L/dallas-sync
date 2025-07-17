export interface CreateReservationRequest {
  roomId: string
  userId: string
  checkinDate: Date
  checkoutDate: Date
  totalPrice: number
  tenantId?: string
}
