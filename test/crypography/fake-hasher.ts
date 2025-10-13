import { HashCompare } from "@/domain/forum/application/cryptography/hash-compare";
import { HashGenerator } from "@/domain/forum/application/cryptography/hash-generator";

export class FakeHasher implements HashGenerator, HashCompare {
  hash(plain: string): Promise<string> {
    return Promise.resolve(`hashed-${plain}`);
  }
  compare(plain: string, hashed: string): Promise<boolean> {
    return Promise.resolve(hashed === `hashed-${plain}`);
  }
}
