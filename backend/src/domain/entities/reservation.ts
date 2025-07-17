import { ReservationStatus } from '../enums/reservation-status.enum'

export class Reservation {
  private _status: ReservationStatus

  constructor(
    public readonly id: string,
    public readonly roomId: string,
    public readonly userId: string,
    public checkinDate: Date,
    public checkoutDate: Date,
    public totalPrice: number,
    status: ReservationStatus = ReservationStatus.BOOKED,
    public tenantId?: string,
  ) {
    if (checkinDate >= checkoutDate) {
      throw new Error('checkinDate must be before checkoutDate')
    }
    if (totalPrice < 0) {
      throw new Error('totalPrice must be >= 0')
    }
    if (!Object.values(ReservationStatus).includes(status)) {
      throw new Error(`Invalid status: ${status}`)
    }
    this._status = status
  }

  get status(): ReservationStatus {
    return this._status
  }

  cancel(): void {
    if (this._status !== ReservationStatus.BOOKED) {
      throw new Error('Can only cancel a booked reservation')
    }
    this._status = ReservationStatus.CANCELLED
  }

  finish(): void {
    if (this._status !== ReservationStatus.BOOKED) {
      throw new Error('Can only finish a booked reservation')
    }
    this._status = ReservationStatus.FINISHED
  }
}
