import { Controller, Get, Param } from '@nestjs/common'
import { Room } from 'src/domain/entities/room'
import { RoomRepository } from 'src/domain/repositories/room-repository'

@Controller('rooms/:id')
export class GetUniqueRoomController {
  constructor(private readonly roomRepository: RoomRepository) {}

  @Get()
  async handle(@Param('id') id: string): Promise<Room | null> {
    return this.roomRepository.findById(id)
  }
}
