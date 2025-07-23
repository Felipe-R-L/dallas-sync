import { Reservation } from '../entities/reservation'

export abstract class ReservationRepository {
  abstract create(reservation: Reservation): Promise<void>
  abstract findById(id: string): Promise<Reservation | null>
  abstract findByRoomBetweenDates(
    roomId: string,
    checkin: Date,
    checkout: Date,
  ): Promise<Reservation[]>
}
