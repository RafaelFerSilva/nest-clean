import { left, right } from '@/core/either'
import { QuestionCommentRepository } from '../repositories/question-comments-repository'
import { NotAllowedError } from './erros/not-allowed-error'
import { ResourceNotFoundError } from './erros/recource-not-found-error'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

// type DeleteQuestionCommentUseCaseResponse = Either<
//   ResourceNotFoundError | NotAllowedError,
//   null
// >

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest) {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (authorId.toString() !== questionComment.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionCommentsRepository.delete(questionComment)

    return right(null)
  }
}
