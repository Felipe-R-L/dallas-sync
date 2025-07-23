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
    private readonly _createdAt?: Date,
    private readonly _updatedAt?: Date,
  ) {
    if (basePrice <= 0) {
      throw new Error('Base price must be greater than 0.')
    }
    if (!Object.values(RoomStatus).includes(status)) {
      throw new Error(`Invalid room status ${status}`)
    }
    this._status = status
  }

  get status(): RoomStatus {
    return this._status
  }

  get createdAt(): Date | undefined {
    return this._createdAt
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt
  }

  markOccupied(): void {
    if (this._status === RoomStatus.MAINTENANCE) {
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
