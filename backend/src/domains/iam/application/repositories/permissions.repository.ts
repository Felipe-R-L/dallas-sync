import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

import { Permission } from '../../enterprise/entities/permission.entity'

export abstract class PermissionsRepository {
  abstract create(Permission: Permission): Promise<void>
  abstract findAll(): Promise<Permission[]>
  abstract findById(id: UniqueEntityID): Promise<Permission | null>
  abstract update(Permission: Permission): Promise<void>
  abstract delete(id: UniqueEntityID): Promise<void>
  abstract restore(id: UniqueEntityID): Promise<void>
}
