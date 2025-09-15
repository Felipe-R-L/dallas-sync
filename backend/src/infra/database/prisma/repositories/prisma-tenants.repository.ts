import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { TenantsRepository } from 'src/domains/iam/application/repositories/tenants.repository'
import { Tenant } from 'src/domains/iam/enterprise/entities/tenant.entity'

import { PrismaTenantMapper } from '../../mappers/prisma-tenant.mapper'
import { PrismaService } from '../prisma.service'

export class PrismaTenantsRepository implements TenantsRepository {
  constructor(private prisma: PrismaService) {}

  async create(tenant: Tenant): Promise<void> {
    const data = PrismaTenantMapper.toPrisma(tenant)
    await this.prisma.tenant.create({ data })
  }

  async findAll(): Promise<Tenant[]> {
    const data = await this.prisma.tenant.findMany()
    return data.map(PrismaTenantMapper.toDomain)
  }

  async findById(id: UniqueEntityID): Promise<Tenant | null> {
    const data = await this.prisma.tenant.findUnique({
      where: { id: id.toString() },
    })
    if (!data) return null
    return PrismaTenantMapper.toDomain(data)
  }

  async update(tenant: Tenant): Promise<void> {
    const data = PrismaTenantMapper.toPrisma(tenant)

    await this.prisma.tenant.update({
      where: { id: data.id },
      data,
    })
  }
  async delete(id: UniqueEntityID): Promise<void> {
    await this.prisma.tenant.update({
      where: {
        id: id.toString(),
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
  async restore(id: UniqueEntityID): Promise<void> {
    await this.prisma.tenant.update({
      where: {
        id: id.toString(),
      },
      data: {
        deletedAt: null,
      },
    })
  }
}
