export type RoomStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'DIRTY';

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
    if (!['AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'DIRTY'].includes(status)) {
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
    this._status = 'OCCUPIED';
  }

  markAvailable() {
    this._status = 'AVAILABLE';
  }

  markMaintenance() {
    this._status = 'MAINTENANCE';
  }

  markDirty() {
    this._status = 'DIRTY';
  }
}
