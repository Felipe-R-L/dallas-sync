import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

import { User } from '../../enterprise/entities/user.entity'

export abstract class UsersRepository {
  abstract create(User: User): Promise<void>
  abstract findAll(): Promise<User[]>
  abstract findById(id: UniqueEntityID): Promise<User | null>
  abstract findByTenant(tenantId: UniqueEntityID): Promise<User[]>
  abstract update(User: User): Promise<void>
  abstract delete(id: UniqueEntityID): Promise<void>
  abstract restore(id: UniqueEntityID): Promise<void>
}
