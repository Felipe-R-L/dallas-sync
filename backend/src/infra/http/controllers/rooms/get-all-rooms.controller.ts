import { Controller, Get } from '@nestjs/common'
import { Room } from 'src/domain/entities/room'
import { RoomRepository } from 'src/domain/repositories/room-repository'

@Controller('rooms')
export class GetAllRoomsController {
  constructor(private readonly roomRepository: RoomRepository) {}

  @Get()
  async handle(): Promise<Room[]> {
    return this.roomRepository.findAll()
  }
}
