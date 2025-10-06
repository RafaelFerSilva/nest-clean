import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch questions question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentRepository)
  })

  test('should be able to fetch recent questions', async () => {
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )

    const result = await sut.execute({ questionId: 'question-1', page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.questionComments).toHaveLength(3)
  })

  test('should be able to fetch paginated question question', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryQuestionCommentRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityId('question-1'),
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.questionComments).toHaveLength(2)
  })
})
