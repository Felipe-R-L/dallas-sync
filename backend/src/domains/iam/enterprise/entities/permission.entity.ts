import { Entity } from "src/core/entities/entity";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Optional } from "src/core/types/optional";

export interface PermissionProps{
  action: string
  resource: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
}

export class Permission extends Entity<PermissionProps>{
  get action(): string {
    return this.props.action
  }
  get resource(): string {
    return this.props.resource
  }
  get createdAt(): Date {
    return this.props.createdAt
  } 
  get updatedAt(): Date { 
    return this.props.updatedAt
  }
  get deletedAt(): Date | null | undefined{
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

  set action(action: string){
    this.props.action = action
    this.touch()
  }
  set resource(resource: string){
    this.props.resource = resource
    this.touch()
  }
   



  static create( props: Optional<PermissionProps, 'createdAt' | 'updatedAt'>, id?: UniqueEntityID): Permission {
    const now = new Date()
    const permission = new Permission(
      {
        action: props.action,
        resource: props.resource,

        createdAt: props.createdAt ?? now,
        updatedAt: props.updatedAt ?? now,
        deletedAt: props.deletedAt ?? null,
    },
      id,
    )
    return permission
  }
}