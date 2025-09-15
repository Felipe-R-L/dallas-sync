import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  private value: string

  toString(): string {
    return this.value
  }

  toValue(): unknown {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  public equals(id: UniqueEntityID): boolean {
    return id.toValue() === this.value
  }
}