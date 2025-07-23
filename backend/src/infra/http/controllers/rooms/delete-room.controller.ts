import { Controller, Delete, Param } from '@nestjs/common'
import { RoomRepository } from 'src/domain/repositories/room-repository'

@Controller('rooms/:id')
export class DeleteRoomController {
  constructor(private readonly roomRepository: RoomRepository) {}

  @Delete()
  async handle(@Param('id') id: string): Promise<void> {
    await this.roomRepository.delete(id)
  }
}
