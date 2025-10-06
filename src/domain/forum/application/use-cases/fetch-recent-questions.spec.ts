import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch recent questions', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository)
  })

  test('should be able to fetch recent questions', async () => {
    const newQuestion1 = makeQuestion({
      createdAt: new Date('2023-10-01T00:00:00Z'),
    })
    const newQuestion2 = makeQuestion({
      createdAt: new Date('2023-09-30T00:00:00Z'),
    })

    const newQuestion3 = makeQuestion({
      createdAt: new Date('2023-09-29T00:00:00Z'),
    })

    await inMemoryQuestionRepository.create(newQuestion1)
    await inMemoryQuestionRepository.create(newQuestion2)
    await inMemoryQuestionRepository.create(newQuestion3)

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.questions).toHaveLength(3)
  })

  test('should be able to fetch paginated recent questions', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.questions).toHaveLength(2)
  })
})
