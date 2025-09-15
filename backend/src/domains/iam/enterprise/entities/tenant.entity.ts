import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export interface TenantProps {
  cnpj: string
  name: string
  active: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}

export class Tenant extends Entity<TenantProps> {
  get cnpj(): string {
    return this.props.cnpj
  }
  get name(): string {
    return this.props.name
  }
  get active(): boolean {
    return this.props.active
  }
  get createdAt(): Date {
    return this.props.createdAt
  }
  get updatedAt(): Date {
    return this.props.updatedAt
  }
  get deletedAt(): Date | null | undefined {
    return this.props.deletedAt
  }

  touch(): void {
    this.props.updatedAt = new Date()
  }
  delete(): void {
    this.props.deletedAt = new Date()
    this.touch()
  }
  restore(): void {
    this.props.deletedAt = undefined
    this.touch()
  }

  set cnpj(cnpj: string) {
    this.props.cnpj = cnpj
    this.touch()
  }
  set name(name: string) {
    this.props.name = name
    this.touch()
  }
  set active(active: boolean) {
    this.props.active = active
    this.touch()
  }

  static create(
    props: Optional<TenantProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ): Tenant {
    const now = new Date()
    const tenant = new Tenant(
      {
        cnpj: props.cnpj,
        name: props.name,
        active: props.active ?? true,
        createdAt: props.createdAt ?? now,
        updatedAt: props.updatedAt ?? now,
        deletedAt: props.deletedAt ?? null,
      },
      id,
    )
    return tenant
  }
}
