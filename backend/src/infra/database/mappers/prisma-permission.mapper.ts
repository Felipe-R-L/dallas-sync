import { Permission as PrismaPermission, Prisma } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Permission } from 'src/domains/iam/enterprise/entities/permission.entity'

export class PrismaPermissionMapper {
  static toDomain(raw: PrismaPermission): Permission {
    return Permission.create(
      {
        action: raw.action,
        resource: raw.resource,
        tenantId: raw.tenantId ? new UniqueEntityID(raw.tenantId) : undefined,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(permission: Permission): Prisma.PermissionUncheckedCreateInput {
    return {
      id: permission.id.toString(),
      action: permission.action,
      resource: permission.resource,
      tenantId: permission.tenantId ? permission.tenantId.toString() : undefined,
      createdAt: permission.createdAt,
      updatedAt: permission.updatedAt,
      deletedAt: permission.deletedAt,
    }
  }
}
