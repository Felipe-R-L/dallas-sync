export interface CreateRoomRequest {
  name: string
  basePrice: number
  description?: string
  tenantId?: string
}
