import { RegisterStudentUseCase } from "./register-student";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-repository";
import { FakeHasher } from "test/crypography/fake-hasher";

let inMemoryStudentRepository: InMemoryStudentsRepository;
let fakeHasher: FakeHasher;
let sut: RegisterStudentUseCase;

describe("Register Student", () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentsRepository();
    fakeHasher = new FakeHasher();
    sut = new RegisterStudentUseCase(inMemoryStudentRepository, fakeHasher);
  });

  test("should be able to register a new student", async () => {
    const result = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect({ student: inMemoryStudentRepository.items[0] }).toEqual(
      result.value
    );
  });

  test("should hash the password before saving the student", async () => {
    const result = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryStudentRepository.items[0].password).toEqual(
      "hashed-123456"
    );
  });
});
