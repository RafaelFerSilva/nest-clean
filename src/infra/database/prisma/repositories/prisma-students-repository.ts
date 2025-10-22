import { Students } from "@/domain/forum/enterprise/entities/student";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { StudentsRepository } from "@/domain/forum/application/repositories/students-repository";
import { PrismaStudentMapper } from "../mappers/prisma-student-mapper";

@Injectable()
export class PrismaStudentRepository implements StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(student: Students): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(student);
    await this.prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string): Promise<Students | null> {
    const student = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!student) return null;

    return PrismaStudentMapper.toDomain(student);
  }
}
