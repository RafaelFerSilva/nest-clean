import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswerepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('AnswerQuestionUseCase', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswerepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new AnswerQuestionUseCase(inMemoryAnswerepository)
  })

  test('should be able create an answer', async () => {
    const result = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Conteúdo da resposta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerepository.items[0]).toEqual(result.value?.answer)
    expect(
      inMemoryAnswerepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryAnswerepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
    ])
  })
})
