import { Body, Controller, Param, Put } from '@nestjs/common'
import { Room } from 'src/domain/entities/room'
import { RoomRepository } from 'src/domain/repositories/room-repository'

@Controller('rooms/:id')
export class UpdateRoomController {
  constructor(private readonly roomRepository: RoomRepository) {}

  @Put()
  async handle(@Param('id') id: string, @Body() data: any): Promise<void> {
    const room = new Room(
      id,
      data.name,
      data.basePrice,
      data.status,
      data.description,
      data.tenantId,
    )
    await this.roomRepository.update(room)
  }
}
