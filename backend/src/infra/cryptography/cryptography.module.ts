import { Module } from '@nestjs/common'
import { HashGenerator } from 'src/domains/iam/application/cryptography/hash-generator'

import { BcryptHashProvider } from './bcrypt-hash-provider'

@Module({
  providers: [
    {
      provide: HashGenerator,
      useClass: BcryptHashProvider,
    },
  ],
  exports: [],
})
export class CryptographyModule {}
