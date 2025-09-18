import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { UserGroupsRepository } from 'src/domains/iam/application/repositories/user-groups.repository'
import { UserGroup } from 'src/domains/iam/enterprise/entities/user-group.entity'

import { PrismaUserGroupMapper } from '../../mappers/prisma-user-group.mapper'
import { PrismaService } from '../prisma.service'

export class PrismaUserGroupsRepository implements UserGroupsRepository {
  constructor(private prisma: PrismaService) {}

  async create(userGroup: UserGroup): Promise<void> {
    const data = PrismaUserGroupMapper.toPrisma(userGroup)
    await this.prisma.userGroup.create({ data })
  }

  async findAll(): Promise<UserGroup[]> {
    const data = await this.prisma.userGroup.findMany()
    return data.map(PrismaUserGroupMapper.toDomain)
  }

  async findById(id: UniqueEntityID): Promise<UserGroup | null> {
    const data = await this.prisma.userGroup.findUnique({
      where: { id: id.toString() },
    })
    if (!data) return null
    return PrismaUserGroupMapper.toDomain(data)
  }

  async findByTenant(tenantId: UniqueEntityID): Promise<UserGroup[]> {
    const data = await this.prisma.userGroup.findMany({ where: { tenantId: tenantId.toString() } })

    return data.map(PrismaUserGroupMapper.toDomain)
  }

  async findByUser(userId: UniqueEntityID): Promise<UserGroup[]> {
    const data = await this.prisma.userGroup.findMany({
      where: {
        users: {
          some: {
            id: userId.toString(),
          },
        },
      },
    })

    return data.map(PrismaUserGroupMapper.toDomain)
  }
  async update(userGroup: UserGroup): Promise<void> {
    const data = PrismaUserGroupMapper.toPrisma(userGroup)

    await this.prisma.userGroup.update({
      where: { id: data.id },
      data,
    })
  }
  async delete(id: UniqueEntityID): Promise<void> {
    await this.prisma.userGroup.update({
      where: {
        id: id.toString(),
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
  async restore(id: UniqueEntityID): Promise<void> {
    await this.prisma.userGroup.update({
      where: {
        id: id.toString(),
      },
      data: {
        deletedAt: null,
      },
    })
  }
}
