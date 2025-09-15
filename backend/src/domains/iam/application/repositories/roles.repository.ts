import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

import { Role } from '../../enterprise/entities/role.entity'

export abstract class RolesRepository {
  abstract create(role: Role): Promise<void>
  abstract findAll(): Promise<Role[]>
  abstract findById(roleId: UniqueEntityID): Promise<Role | null>
  abstract findByTenant(tenantId: UniqueEntityID): Promise<Role[]>
  abstract update(role: Role): Promise<void>
  abstract delete(roleId: UniqueEntityID): Promise<void>
  abstract restore(roleId: UniqueEntityID): Promise<void>
}
