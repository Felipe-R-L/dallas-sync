import { Room } from 'src/domain/entities/room';
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
      'AVAILABLE',
      request.description,
      request.tenantId,
    );
    await this.roomRepository.create(room);

    return room;
  }
}
