import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) {
  const title = faker.lorem.words(4)
  const slug = Slug.createFromText(title)

  const question = Question.create(
    {
      title,
      content: faker.lorem.text(),
      authorId: new UniqueEntityId(),
      slug,
      ...override,
    },
    id,
  )

  return question
}
