import { UniqueEntityID } from "src/core/entities/unique-entity-id";

import { UserGroup } from "../../enterprise/entities/user-group.entity";

export abstract class UserGroupsRepository {
  abstract create(UserGroup: UserGroup): Promise<void>
  abstract findAll(): Promise<UserGroup[]>
  abstract findById(id: UniqueEntityID): Promise<UserGroup | null>
  abstract findByName(name: string): Promise<UserGroup | null>
  abstract update(UserGroup: UserGroup): Promise<void>
  abstract delete(id: UniqueEntityID): Promise<void>
  abstract restore(id: UniqueEntityID): Promise<void>
}