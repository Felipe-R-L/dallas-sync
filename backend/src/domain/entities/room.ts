import { RoomStatus } from '../enums/room-status.enum'

export class Room {
  private _status: RoomStatus

  constructor(
    public readonly id: string,
    public name: string,
    public basePrice: number,
    status: RoomStatus,
    public description?: string,
    public tenantId?: string,
  ) {
    if (basePrice <= 0) {
      throw Error('Base price must be greater than 0.')
    }
    if (!Object.values(RoomStatus).includes(status)) {
      throw Error(`Invalid room status ${status}`)
    }
    this._status = status
  }

  get status(): RoomStatus {
    return this._status
  }

  markOccupied(): void {
    if (this._status === 'MAINTENANCE') {
      throw new Error('Cannot mark occupied while in maintenance')
    }
    this._status = RoomStatus.OCCUPIED
  }
  markAvailable(): void {
    this._status = RoomStatus.AVAILABLE
  }
  markMaintenance(): void {
    this._status = RoomStatus.MAINTENANCE
  }
  markDirty(): void {
    this._status = RoomStatus.DIRTY
  }
}
