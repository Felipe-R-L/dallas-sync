import { Entity } from "src/core/entities/entity";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Optional } from "src/core/types/optional";

export interface UserProps{
    fullName: string
    email: string
    password: string
    active: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date | null
}

export class User extends Entity<UserProps>{
  get fullName(): string {
    return this.props.fullName
  }
  get email(): string {
    return this.props.email
  }
  get password(): string {
    return this.props.password
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

  set fullName(fullName: string){
    this.props.fullName = fullName
    this.touch()
  }
  set email(email: string){
    this.props.email = email
    this.touch()
  }
  set password(password: string){
    this.props.password = password
    this.touch()
  }
  set active(active: boolean){
    this.props.active = active
    this.touch()
  }


  static create( props: Optional<UserProps, 'createdAt' | 'updatedAt'>, id?: UniqueEntityID): User {
    const now = new Date()
    const user = new User(
      {
        fullName: props.fullName,
        email: props.email,
        password: props.password,
        active: props.active ?? true,
        createdAt: props.createdAt ?? now,
        updatedAt: props.updatedAt ?? now,
        deletedAt: props.deletedAt ?? null,
    },
      id,
    )
    return user
  }
}