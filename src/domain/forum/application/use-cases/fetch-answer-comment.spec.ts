import { FetchAnswerCommentsUseCase } from './fetch-answer-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch answers answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentRepository)
  })

  test('should be able to fetch recent answers', async () => {
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-1'),
      }),
    )
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-1'),
      }),
    )
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-1'),
      }),
    )

    const result = await sut.execute({ answerId: 'answer-1', page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answerComments).toHaveLength(3)
  })

  test('should be able to fetch paginated answer answer', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId('answer-1'),
        }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answerComments).toHaveLength(2)
  })
})
