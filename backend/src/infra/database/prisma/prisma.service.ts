import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super()

    this.$use(async (params, next) => {
      const softDeleteModels = ['User', 'Tenant', 'Room', 'Stay', 'Asset'] as const
      const isSoftDeleteModel = params.model && softDeleteModels.includes(params.model as any)

      const includeDeleted =
        (params.args?.meta as { includeDeleted?: boolean } | undefined)?.includeDeleted === true

      if (isSoftDeleteModel && !includeDeleted) {
        if (params.action === 'findUnique' || params.action === 'findFirst') {
          params.action = 'findFirst'
          params.args ||= {}
          params.args.where ||= {}
          params.args.where.deletedAt = null
        }

        if (params.action === 'findMany') {
          params.args ||= {}
          if (params.args.where) {
            if (params.args.where.deletedAt === undefined) {
              params.args.where.deletedAt = null
            }
          } else {
            params.args.where = { deletedAt: null }
          }
        }
      }

      if (params.args?.meta) {
        const { meta, ...rest } = params.args
        params.args = rest
      }

      return next(params)
    })
  }

  async onModuleInit(): Promise<void> {
    await this.$connect()
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect()
  }
}
