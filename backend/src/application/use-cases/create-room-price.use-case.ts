import { RoomPriceRepository } from 'src/domain/repositories/room-price-repository';
import { CreateRoomPriceRequest } from '../dto/create-room-price.request';
import { RoomPrice } from 'src/domain/entities/room-price';
export class CreateRoomPriceUseCase {
  constructor(private roomPriceRepository: RoomPriceRepository) {}

  async execute(data: CreateRoomPriceRequest): Promise<void> {
    const overlapping = await this.roomPriceRepository.findOverlapping(
      data.roomId,
      data.dayOfWeek,
      data.startTime,
      data.endTime,
    );
    if (overlapping) {
      throw new Error('Overlapping time range already exists for this room');
    }

    const roomPrice = new RoomPrice(
      crypto.randomUUID(),
      data.roomId,
      data.name || '',
      data.dayOfWeek,
      data.startTime,
      data.endTime,
      data.price,
    );
    await this.roomPriceRepository.create(roomPrice);
  }
}
