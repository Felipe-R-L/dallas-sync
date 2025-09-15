

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();

    this.$use(async (params, next) => {
      const softDeleteModels = ['User', 'Tenant', 'Room', 'Stay', 'Asset']; 
     if (params.model && softDeleteModels.includes(params.model)) {
        if (params.action === 'findUnique' || params.action === 'findFirst') {
          
          params.action = 'findFirst';
          params.args.where['deletedAt'] = null;
        }
        if (params.action === 'findMany') {
          
          if (params.args.where) {
            if (params.args.where.deletedAt === undefined) {
              params.args.where['deletedAt'] = null;
            }
          } else {
            params.args['where'] = { deletedAt: null };
          }
        }
        
      }
      return next(params);
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}