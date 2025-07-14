export interface CreateReservationRequest {
  roomId: string;
  userId: string;
  checkinDate: Date;
  checkoutDate: Date;
  totalPreice: number;
  tenantId?: number;
}
