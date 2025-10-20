import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Students,
  StudentsProps,
} from "@/domain/forum/enterprise/entities/student";

export function makeStudent(
  override: Partial<StudentsProps> = {},
  id?: UniqueEntityId
) {
  const student = Students.create(
    {
      name: "Default Name",
      email: "default@example.com",
      password: "default_password",
      ...override,
    },
    id
  );

  return student;
}
