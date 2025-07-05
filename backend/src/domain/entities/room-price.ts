export class RoomPrice {
  constructor(
    public readonly id: string,
    public roomId: string,
    public name: string,
    public dayOfWeek: number,
    public startTime: Date,
    public endTime: Date,
    public price: number,
  ) {
    if (dayOfWeek < 0 || dayOfWeek > 6) {
      throw Error(`Invalid day of week: ${dayOfWeek} (must be 0 - 6)`);
    }
    if (startTime >= endTime) {
      throw Error('Invalid time range: startTime must be before endTime');
    }
    if (price < 0) {
      throw Error('Price must be greater than 0.');
    }
  }
}
