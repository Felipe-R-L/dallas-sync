import { $Enums, Prisma, Room as PrismaRoomModel } from 'generated/prisma'
import { RoomStatus } from 'src/domain/enums/room-status.enum'

import { Room } from '../../../../domain/entities/room'

export class PrismaRoomMapper {
  static toDomain(pr: PrismaRoomModel): Room {
    return new Room(
      pr.id,
      pr.name,
      pr.basePrice,
      pr.status as RoomStatus,
      pr.description ?? undefined,
      pr.tenantId ?? undefined,
      pr.createdAt,
      pr.updatedAt,
    )
  }

  static toPrismaCreate(room: Room): Prisma.RoomCreateInput {
    return {
      id: room.id,
      name: room.name,
      basePrice: room.basePrice,
      status: room.status as $Enums.RoomStatus,
      description: room.description ?? null,
      tenantId: room.tenantId ?? null,
    }
  }

  static toPrismaUpdate(room: Room): Prisma.RoomUpdateInput {
    return {
      name: room.name,
      basePrice: room.basePrice,
      status: room.status as $Enums.RoomStatus,
      description: room.description ?? null,
      tenantId: room.tenantId ?? null,
    }
  }
}
