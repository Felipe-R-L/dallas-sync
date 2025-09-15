import { Prisma, Tenant as PrismaTenant } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Tenant } from 'src/domains/iam/enterprise/entities/tenant.entity'

export class PrismaTenantMapper {
  static toDomain(raw: PrismaTenant): Tenant {
    return Tenant.create(
      {
        cnpj: raw.cnpj,
        name: raw.name,
        active: raw.active,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(tenant: Tenant): Prisma.TenantUncheckedCreateInput {
    return {
      id: tenant.id.toString(),
      cnpj: tenant.cnpj,
      name: tenant.name,
      active: tenant.active,
      createdAt: tenant.createdAt,
      updatedAt: tenant.updatedAt,
      deletedAt: tenant.deletedAt,
    }
  }
}
