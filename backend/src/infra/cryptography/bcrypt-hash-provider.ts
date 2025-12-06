import * as bcrypt from 'bcryptjs'
import { HashGenerator } from 'src/domains/iam/application/cryptography/hash-generator'

export class BcryptHashProvider implements HashGenerator {
  async hash(plain: string): Promise<string> {
    const SALT_LENGHT = 10
    return bcrypt.hash(plain, SALT_LENGHT)
  }
  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash)
  }
}
