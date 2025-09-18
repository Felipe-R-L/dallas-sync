import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { UsersRepository } from 'src/domains/iam/application/repositories/users.repository'
import { User } from 'src/domains/iam/enterprise/entities/user.entity'

import { PrismaUserMapper } from '../../mappers/prisma-user.mapper'
import { PrismaService } from '../prisma.service'

export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)
    await this.prisma.user.create({ data })
  }

  async findAll(): Promise<User[]> {
    const data = await this.prisma.user.findMany()
    return data.map(PrismaUserMapper.toDomain)
  }

  async findById(id: UniqueEntityID): Promise<User | null> {
    const data = await this.prisma.user.findUnique({
      where: { id: id.toString() },
    })
    if (!data) return null
    return PrismaUserMapper.toDomain(data)
  }

  async findByTenant(tenantId: UniqueEntityID): Promise<User[]> {
    const data = await this.prisma.user.findMany({ where: { tenantId: tenantId.toString() } })

    return data.map(PrismaUserMapper.toDomain)
  }

  async update(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.update({
      where: { id: data.id },
      data,
    })
  }
  async delete(id: UniqueEntityID): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: id.toString(),
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
  async restore(id: UniqueEntityID): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: id.toString(),
      },
      data: {
        deletedAt: null,
      },
    })
  }
}
