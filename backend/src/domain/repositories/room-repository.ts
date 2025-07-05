import { Room } from '../entities/room';

export interface RoomRepository {
  create(room: Room): Promise<void>;
  findById(id: string): Promise<Room | null>;
  findAll(): Promise<Room[]>;
  update(room: Room): Promise<void>;
}
