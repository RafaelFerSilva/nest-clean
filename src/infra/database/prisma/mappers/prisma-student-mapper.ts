import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Students } from "@/domain/forum/enterprise/entities/student";
import { User as PrismaStudent, Prisma } from "generated/prisma/client";

export class PrismaStudentMapper {
  static toDomain(raw: PrismaStudent): Students {
    return Students.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityId(raw.id)
    );
  }

  static toPrisma(student: Students): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toValue(),
      name: student.name,
      email: student.email,
      password: student.password,
    };
  }
}
