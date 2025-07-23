import { Room } from '../entities/room'

export abstract class RoomRepository {
  abstract create(room: Room): Promise<void>
  abstract findById(id: string): Promise<Room | null>
  abstract findAll(): Promise<Room[]>
  abstract update(room: Room): Promise<void>
  abstract delete(id: string): Promise<void>
}
