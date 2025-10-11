import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { StudentsRepository } from "../repositories/students-repository";
import { Encrypter } from "../cryptography/encrypter";
import { WrongCreadentialsError } from "./errors/wrong-credentials-error";
import { HashCompare } from "../cryptography/hash-compare";

interface AuthenticateStudentUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateStudentUseCaseResponse = Either<
  WrongCreadentialsError,
  { accessToken: string }
>;

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashCompare: HashCompare,
    private encrypter: Encrypter
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentsRepository.findByEmail(email);

    if (!student) {
      return left(new WrongCreadentialsError());
    }

    const isPasswordValid = await this.hashCompare.compare(
      password,
      student.password
    );
    if (!isPasswordValid) {
      left(new WrongCreadentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: student.id.toString(),
    });

    return right({ accessToken });
  }
}
