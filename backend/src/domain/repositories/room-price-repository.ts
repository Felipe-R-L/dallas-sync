import { RoomPrice } from '../entities/room-price'

export abstract class RoomPriceRepository {
  abstract create(price: RoomPrice): Promise<void>
  abstract findRoomAndDay(roomId: number, dayOfWeek: number): Promise<RoomPrice>
  abstract findOverlapping(
    roomId: string,
    dayOfWeek: number,
    startTime: Date,
    endTime: Date,
  ): Promise<RoomPrice | null>
}
