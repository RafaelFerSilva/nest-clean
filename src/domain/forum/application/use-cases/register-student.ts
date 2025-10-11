import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { StudentsRepository } from "../repositories/students-repository";
import { HashGenerator } from "../cryptography/hash-generator";
import { StudentAlreadyExistsError } from "./errors/student-already-exists-error";
import { Students } from "../../enterprise/entities/student";

interface RegisterStudentUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  { student: Students }
>;

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const strudentWithSameEmail = await this.studentsRepository.findByEmail(
      email
    );

    if (!strudentWithSameEmail) {
      return left(new StudentAlreadyExistsError(email));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const student = Students.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.studentsRepository.create(student);

    return right({ student });
  }
}
