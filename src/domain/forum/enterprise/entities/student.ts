import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface StudentsProps {
  name: string
}

export class Students extends Entity<StudentsProps> {
  static create(props: StudentsProps, id?: UniqueEntityId) {
    const student = new Students(
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
