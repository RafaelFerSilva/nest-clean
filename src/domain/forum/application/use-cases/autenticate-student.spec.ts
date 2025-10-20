import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-repository";
import { FakeHasher } from "test/crypography/fake-hasher";
import { FakeEncrypter } from "test/crypography/fake-encrypter";
import { AuthenticateStudentUseCase } from "./authenticate-student";
import { makeStudent } from "test/factories/make-student";

let inMemoryStudentRepository: InMemoryStudentsRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let sut: AuthenticateStudentUseCase;

describe("Autenticate Student", () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentsRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();

    sut = new AuthenticateStudentUseCase(
      inMemoryStudentRepository,
      fakeHasher,
      fakeEncrypter
    );
  });

  test("should be able to autenticate a student", async () => {
    const student = makeStudent({
      email: "student@example.com",
      password: await fakeHasher.hash("123456"),
    });

    inMemoryStudentRepository.items.push(student);

    const result = await sut.execute({
      email: "student@example.com",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });
});
