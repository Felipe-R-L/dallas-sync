import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<Props> {
  private _id: UniqueEntityID
  protected props: Props

  get id(): UniqueEntityID {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? new UniqueEntityID()
  }

  /**
   * Entities are compared based on their unique identifier.
   */
  public equals(object?: Entity<Props>): boolean {
    if (object === null || object === undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    if (!(object instanceof Entity)) {
      return false
    }

    return this._id.equals(object._id)
  }

  /**
   * Returns a string representation of the entity,
   * useful for logging and debugging.
   */
  public toString(): string {
    return `${this.constructor.name}#${JSON.stringify({
      id: this.id.toString(),
      props: this.props,
    })}`
  }
}
