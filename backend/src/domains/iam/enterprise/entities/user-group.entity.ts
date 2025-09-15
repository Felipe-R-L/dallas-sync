import { Entity } from "src/core/entities/entity";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Optional } from "src/core/types/optional";

export interface UserGroupProps{
    name: string
    description?: string | null
    tenantId: UniqueEntityID
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date | null
}

export class UserGroup extends Entity<UserGroupProps>{
  get name(): string {
    return this.props.name
  }
  get description(): string | null | undefined {
    return this.props.description
  }
  get tenantId(): UniqueEntityID {
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
  
  touch(): void{
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

  set name(name: string){
    this.props.name = name
    this.touch()
  }
  set description(description: string | null | undefined){
    this.props.description = description
    this.touch()
  }
  set tenantId(tenantId: UniqueEntityID){
    this.props.tenantId = tenantId
    this.touch()
  }

  static create( props: Optional<UserGroupProps, 'createdAt' | 'updatedAt'>, id?: UniqueEntityID): UserGroup {
    const now = new Date()
    const userGroup = new UserGroup(
      {
        name: props.name,
        description: props.description ?? null,
        tenantId: props.tenantId,
        createdAt: props.createdAt ?? now,
        updatedAt: props.updatedAt ?? now,
        deletedAt: props.deletedAt ?? null,
    },
      id,
    )
    return userGroup
  }
}