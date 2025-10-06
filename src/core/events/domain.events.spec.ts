import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityId } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'
import { vi } from 'vitest'

class CustomAgregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAgregate; // eslint-disable-line

  constructor(aggregate: CustomAgregate) {
    this.ocurredAt = new Date()
    this.aggregate = aggregate
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

class CustomAgregate extends AggregateRoot<unknown> {
  static create() {
    const aggregate = new CustomAgregate(null)

    aggregate.addDomainEvent(new CustomAgregateCreated(aggregate))

    return aggregate
  }
}

describe('domain events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // Subscriber cadastrado (ouvindo o evento de "resposta criada")
    DomainEvents.register(callbackSpy, CustomAgregateCreated.name)

    // Estou criando uma resposta porém sem salvar no banco
    const aggregate = CustomAgregate.create()

    // Evento criado e não disparado
    expect(aggregate.domainEvents).toContainEqual(
      expect.any(CustomAgregateCreated),
    )
    expect(aggregate.domainEvents).toHaveLength(1)

    // Salvando a resposta no banco de dados e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // O subscriber ouve o evento e faz o que precisa ser feito com o dado
    expect(callbackSpy).toHaveBeenCalledWith(expect.any(CustomAgregateCreated))

    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
