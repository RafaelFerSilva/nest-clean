import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface AnswerAttachmentProps {
  answerid: UniqueEntityId
  attachmentId: UniqueEntityId
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  get answerId(): UniqueEntityId {
    return this.props.answerid
  }

  get attachmentId(): UniqueEntityId {
    return this.props.attachmentId
  }

  static create(props: AnswerAttachmentProps, id?: UniqueEntityId) {
    const attachment = new AnswerAttachment(props, id)
    return attachment
  }
}
