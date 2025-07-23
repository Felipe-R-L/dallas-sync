import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'
import { CreateRoomController } from './controllers/rooms/create-room.controller'
import { DeleteRoomController } from './controllers/rooms/delete-room.controller'
import { GetAllRoomsController } from './controllers/rooms/get-all-rooms.controller'
import { GetUniqueRoomController } from './controllers/rooms/get-unique-room.controller'
import { UpdateRoomController } from './controllers/rooms/update-room.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    GetAllRoomsController,
    GetUniqueRoomController,
    CreateRoomController,
    UpdateRoomController,
    DeleteRoomController,
  ],
})
export class HttpModule {}
