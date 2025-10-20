import { DomainEvents } from "@/core/events/domain-events";
import { StudentsRepository } from "@/domain/forum/application/repositories/students-repository";
import { Students } from "@/domain/forum/enterprise/entities/student";

export class InMemoryStudentsRepository implements StudentsRepository {
  public items: Students[] = [];

  async findByEmail(email: string): Promise<Students | null> {
    return this.items.find((student) => student.email === email) || null;
  }

  async create(student: Students) {
    this.items.push(student);

    DomainEvents.dispatchEventsForAggregate(student.id);
  }
}
