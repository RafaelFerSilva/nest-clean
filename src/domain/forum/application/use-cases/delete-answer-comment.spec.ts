import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { NotAllowedError } from './erros/not-allowed-error'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete answer comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository)
  })

  test('should be able delete a answer comment', async () => {
    const answerComment = makeAnswerComment()
    await inMemoryAnswerCommentRepository.create(answerComment)

    const result = await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerCommentRepository.items).toHaveLength(0)
  })

  test('should not be able delete another user answer comment', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityId('author-1'),
    })
    await inMemoryAnswerCommentRepository.create(answerComment)

    const result = await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
