import { Reservation } from '../entities/reservation';

export interface ReservationRepository {
  create(reservation: Reservation): Promise<void>;
  findById(id: string): Promise<Reservation | null>;
  findByRoomBetweenDates(
    roomId: string,
    checkin: Date,
    checkout: Date,
  ): Promise<Reservation[]>;
}
