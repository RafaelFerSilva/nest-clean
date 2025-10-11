import { Students } from "../../enterprise/entities/student";

export abstract class StudentsRepository {
  abstract create(student: Students): Promise<void>;
  abstract findByEmail(email: string): Promise<Students | null>;
}
