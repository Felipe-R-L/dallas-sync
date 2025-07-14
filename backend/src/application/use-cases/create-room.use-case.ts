import { Room } from 'src/domain/entities/room';
import { RoomStatus } from 'src/domain/enums/room-status.enum';
import { RoomRepository } from 'src/domain/repositories/room-repository';

interface CreateRoomRequest {
  name: string;
  basePrice: number;
  description?: string;
  tenantId?: string;
}

export class CreateRoomUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}
  async execute(request: CreateRoomRequest) {
    const room = new Room(
      crypto.randomUUID(),
      request.name,
      request.basePrice,
      RoomStatus.AVAILABLE,
      request.description,
      request.tenantId,
    );
    await this.roomRepository.create(room);

    return room;
  }
}
