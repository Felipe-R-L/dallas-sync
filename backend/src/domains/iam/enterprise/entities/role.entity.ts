import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export interface RoleProps {
  name: string
  description?: string | null
  tenantId?: UniqueEntityID | null
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}

export class Role extends Entity<RoleProps> {
  get name(): string {
    return this.props.name
  }
  get description(): string | null | undefined {
    return this.props.description
  }
  get tenantId(): UniqueEntityID | null | undefined {
    return this.props.tenantId
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

  set name(name: string) {
    this.props.name = name
    this.touch()
  }
  set description(description: string | null | undefined) {
    this.props.description = description
    this.touch()
  }
  set tenantId(tenantId: UniqueEntityID | null | undefined) {
    this.props.tenantId = tenantId
    this.touch()
  }

  static create(props: Optional<RoleProps, 'createdAt' | 'updatedAt'>, id?: UniqueEntityID): Role {
    const now = new Date()
    const role = new Role(
      {
        name: props.name,
        description: props.description ?? null,
        tenantId: props.tenantId ?? null,

        createdAt: props.createdAt ?? now,
        updatedAt: props.updatedAt ?? now,
        deletedAt: props.deletedAt ?? null,
      },
      id,
    )
    return role
  }
}
