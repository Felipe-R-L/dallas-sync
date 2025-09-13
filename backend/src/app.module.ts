import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { HttpModule } from './management/infra/http/http.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    HttpModule,
  ],
  controllers: [],
  providers: [],   
})
export class AppModule {}