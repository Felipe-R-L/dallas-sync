import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { PermissionsRepository } from 'src/domains/iam/application/repositories/permissions.repository'
import { Permission } from 'src/domains/iam/enterprise/entities/permission.entity'

import { PrismaPermissionMapper } from '../../mappers/prisma-permission.mapper'
import { PrismaService } from '../prisma.service'

export class PrismaPermissionsRepository implements PermissionsRepository {
  constructor(private prisma: PrismaService) {}

  async create(permission: Permission): Promise<void> {
    const data = PrismaPermissionMapper.toPrisma(permission)
    await this.prisma.permission.create({ data })
  }

  async findAll(): Promise<Permission[]> {
    const data = await this.prisma.permission.findMany()
    return data.map(PrismaPermissionMapper.toDomain)
  }

  async findById(id: UniqueEntityID): Promise<Permission | null> {
    const data = await this.prisma.permission.findUnique({
      where: { id: id.toString() },
    })
    if (!data) return null
    return PrismaPermissionMapper.toDomain(data)
  }

  async findByTenant(tenantId: UniqueEntityID): Promise<Permission[]> {
    const data = await this.prisma.permission.findMany({
      where: { tenantId: tenantId.toString() },
    })
    return data.map(PrismaPermissionMapper.toDomain)
  }

  async update(permission: Permission): Promise<void> {
    const data = PrismaPermissionMapper.toPrisma(permission)

    await this.prisma.permission.update({
      where: { id: data.id },
      data,
    })
  }
  async delete(id: UniqueEntityID): Promise<void> {
    await this.prisma.permission.update({
      where: {
        id: id.toString(),
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
  async restore(id: UniqueEntityID): Promise<void> {
    await this.prisma.permission.update({
      where: {
        id: id.toString(),
      },
      data: {
        deletedAt: null,
      },
    })
  }
}
