import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface IntructorProps {
  name: string
}

export class Instructor extends Entity<IntructorProps> {
  static create(props: IntructorProps, id?: UniqueEntityId) {
    const student = new Instructor(
      {
        ...props,
      },
      id,
    )

    return student
  }

  get name() {
    return this.props.name
  }
}
