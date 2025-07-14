import { ReservationRepository } from 'src/domain/repositories/reservation-repository';
import { CreateReservationRequest } from '../dto/create-reservation.use-case';
import { Reservation } from 'src/domain/entities/reservation';

export class CreateReservationUseCase {
  constructor(private reservationRepository: ReservationRepository) {}
  async execute(data: CreateReservationRequest): Promise<void> {
    const overlappingReservations =
      await this.reservationRepository.findByRoomBetweenDates(
        data.roomId,
        data.checkinDate,
        data.checkoutDate,
      );
    if (overlappingReservations) {
      throw new Error('Room already reserved in the selected date range');
    }
    const reservation = new Reservation(
      crypto.randomUUID(),
      data.roomId,
      data.userId,
      data.checkinDate,
      data.checkoutDate,
      data.totalPrice,
      undefined,
      data.tenantId,
    );
    await this.reservationRepository.create(reservation);
  }
}
