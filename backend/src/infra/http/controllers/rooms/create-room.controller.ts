import { Body, Controller, Post } from '@nestjs/common'
import { Room } from 'src/domain/entities/room'
import { RoomRepository } from 'src/domain/repositories/room-repository'

@Controller('rooms')
export class CreateRoomController {
  constructor(private readonly roomRepository: RoomRepository) {}

  @Post()
  async handle(@Body() data: any): Promise<void> {
    const room = new Room(
      data.id,
      data.name,
      data.basePrice,
      data.status,
      data.description,
      data.tenantId,
    )
    await this.roomRepository.create(room)
  }
}
