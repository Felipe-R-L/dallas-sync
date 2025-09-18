import { Prisma, UserGroup as PrismaUserGroup } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { UserGroup } from 'src/domains/iam/enterprise/entities/user-group.entity'

export class PrismaUserGroupMapper {
  static toDomain(raw: PrismaUserGroup): UserGroup {
    return UserGroup.create(
      {
        name: raw.name,
        description: raw.description,
        tenantId: new UniqueEntityID(raw.tenantId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(userGroup: UserGroup): Prisma.UserGroupUncheckedCreateInput {
    return {
      id: userGroup.id.toString(),
      name: userGroup.name,
      description: userGroup.description,
      tenantId: userGroup.tenantId.toString(),
      createdAt: userGroup.createdAt,
      updatedAt: userGroup.updatedAt,
      deletedAt: userGroup.deletedAt,
    }
  }
}
