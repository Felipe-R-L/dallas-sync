import { RoomStatus } from '../enums/room-status.enum';
export class Room {
  private _status: RoomStatus;

  constructor(
    public readonly id: string,
    public name: string,
    public basePrice: number,
    status: RoomStatus,
    public description?: string,
    public tenantId?: string,
  ) {
    if (basePrice <= 0) {
      throw Error('Base price must be greater than 0.');
    }
    if (!Object.values(RoomStatus).includes(status)) {
      throw Error(`Invalid room status ${status}`);
    }
    this._status = status;
  }

  get status() {
    return this._status;
  }

  markOccupied() {
    if (this._status === 'MAINTENANCE') {
      throw new Error('Cannot mark occupied while in maintenance');
    }
    this._status = RoomStatus.OCCUPIED;
  }

  markAvailable() {
    this._status = RoomStatus.AVAILABLE;
  }

  markMaintenance() {
    this._status = RoomStatus.MAINTENANCE;
  }

  markDirty() {
    this._status = RoomStatus.DIRTY;
  }
}
