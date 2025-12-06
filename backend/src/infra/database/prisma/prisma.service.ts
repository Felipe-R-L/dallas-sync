import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['warn', 'error'],
    })

    const softDeleteModels = [
      'User',
      'Tenant',
      'UserGroup',
      'Role',
      'Permission',
      'RoomType',
      'Room',
      'Product',
      'PaymentMethod',
      'Reservation',
      'Shift',
      'FinancialTransaction',
      'AssetType',
    ]

    const extendedClient = this.$extends({
      name: 'soft-delete',
      query: {
        $allModels: {
          async findUnique({ model, args, query }) {
            if (softDeleteModels.includes(model) && !(args as any).where.deletedAt) {
              return (query as any)({
                ...args,
                where: {
                  ...args.where,
                  deletedAt: null,
                },
                action: 'findFirst',
              })
            }
            return query(args)
          },

          async findFirst({ model, args, query }) {
            if (softDeleteModels.includes(model)) {
              const explicitDeleteFilter = (args as any).where?.deletedAt !== undefined

              if (!explicitDeleteFilter) {
                args.where = { ...args.where, deletedAt: null }
              }
            }
            return query(args)
          },

          async findMany({ model, args, query }) {
            if (softDeleteModels.includes(model)) {
              const explicitDeleteFilter = (args as any).where?.deletedAt !== undefined

              if (!explicitDeleteFilter) {
                args.where = { ...args.where, deletedAt: null }
              }
            }
            return query(args)
          },

          async delete({ model, args, query }) {
            if (softDeleteModels.includes(model)) {
              return (this as any).update({
                ...args,
                data: { deletedAt: new Date() },
              })
            }
            return query(args)
          },

          async deleteMany({ model, args, query }) {
            if (softDeleteModels.includes(model)) {
              return (this as any).updateMany({
                ...args,
                data: { deletedAt: new Date() },
              })
            }
            return query(args)
          },
        },
      },
    })

    return extendedClient as any
  }

  async onModuleInit(): Promise<void> {
    await this.$connect()
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect()
  }
}
