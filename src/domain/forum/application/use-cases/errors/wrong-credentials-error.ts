import { UseCaseError } from "@/core/errors/use-case-error";

export class WrongCreadentialsError extends Error implements UseCaseError {
  constructor() {
    super(`Creadentials are not valid`);
    this.name = "WrongCreadentialsError";
  }
}
