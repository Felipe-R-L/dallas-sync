import { Module } from '@nestjs/common'
import { RoomRepository } from 'src/domain/repositories/room-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaRoomRepository } from './prisma/repositories/prisma-room-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: RoomRepository,
      useClass: PrismaRoomRepository,
    },
  ],
  exports: [RoomRepository],
})
export class DatabaseModule {}
