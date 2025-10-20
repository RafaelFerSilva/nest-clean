import { hash, compare } from "bcrypt";
import { HashCompare } from "@/domain/forum/application/cryptography/hash-compare";
import { HashGenerator } from "@/domain/forum/application/cryptography/hash-generator";

export class BcryptHasher implements HashGenerator, HashCompare {
  private HASH_SALT_LENGTH = 8;

  compare(plain: string, hashed: string): Promise<boolean> {
    return compare(plain, hashed);
  }

  hash(value: string): Promise<string> {
    return hash(value, this.HASH_SALT_LENGTH);
  }
}
