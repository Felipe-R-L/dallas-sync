import { RoomPrice } from '../entities/room-price'

export interface RoomPriceRepository {
  create(price: RoomPrice): Promise<void>
  findRoomAndDay(roomId: number, dayOfWeek: number): Promise<RoomPrice>
  findOverlapping(
    roomId: string,
    dayOfWeek: number,
    startTime: Date,
    endTime: Date,
  ): Promise<RoomPrice | null>
}
