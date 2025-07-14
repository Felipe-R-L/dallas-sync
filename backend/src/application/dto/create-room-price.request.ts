export interface CreateRoomPriceRequest {
  roomId: string;
  name?: string;
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;
  price: number;
}
