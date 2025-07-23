import { Injectable } from '@nestjs/common'
import { Room } from 'src/domain/entities/room'
import { RoomRepository } from 'src/domain/repositories/room-repository'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

import { PrismaRoomMapper } from '../mappers/prisma-room.mapper'

@Injectable()
export class PrismaRoomRepository implements RoomRepository {
  constructor(private prisma: PrismaService) {}
  async create(room: Room): Promise<void> {
    await this.prisma.room.create({
      data: PrismaRoomMapper.toPrismaCreate(room),
    })
  }

  async findById(id: string): Promise<Room | null> {
    const room = await this.prisma.room.findUnique({
      where: {
        id,
      },
    })
    if (!room) return null
    return PrismaRoomMapper.toDomain(room)
  }

  async findAll(): Promise<Room[]> {
    const rooms = await this.prisma.room.findMany()
    return rooms.map(PrismaRoomMapper.toDomain)
  }
  async update(room: Room): Promise<void> {
    await this.prisma.room.update({
      where: { id: room.id },
      data: PrismaRoomMapper.toPrismaUpdate(room),
    })
  }
  async delete(id: string): Promise<void> {
    await this.prisma.room.delete({
      where: { id },
    })
  }
}
