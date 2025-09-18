import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { RolesRepository } from 'src/domains/iam/application/repositories/roles.repository'
import { Role } from 'src/domains/iam/enterprise/entities/role.entity'

import { PrismaRoleMapper } from '../../mappers/prisma-role.mapper'
import { PrismaService } from '../prisma.service'

export class PrismaRolesRepository implements RolesRepository {
  constructor(private prisma: PrismaService) {}

  async create(role: Role): Promise<void> {
    const data = PrismaRoleMapper.toPrisma(role)
    await this.prisma.role.create({ data })
  }

  async findAll(): Promise<Role[]> {
    const data = await this.prisma.role.findMany()
    return data.map(PrismaRoleMapper.toDomain)
  }

  async findById(id: UniqueEntityID): Promise<Role | null> {
    const data = await this.prisma.role.findUnique({
      where: { id: id.toString() },
    })
    if (!data) return null
    return PrismaRoleMapper.toDomain(data)
  }

  async findByTenant(tenantId: UniqueEntityID): Promise<Role[]> {
    const data = await this.prisma.role.findMany({
      where: { tenantId: tenantId.toString() },
    })
    return data.map(PrismaRoleMapper.toDomain)
  }

  async update(role: Role): Promise<void> {
    const data = PrismaRoleMapper.toPrisma(role)

    await this.prisma.role.update({
      where: { id: data.id },
      data,
    })
  }
  async delete(id: UniqueEntityID): Promise<void> {
    await this.prisma.role.update({
      where: {
        id: id.toString(),
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
  async restore(id: UniqueEntityID): Promise<void> {
    await this.prisma.role.update({
      where: {
        id: id.toString(),
      },
      data: {
        deletedAt: null,
      },
    })
  }
}
