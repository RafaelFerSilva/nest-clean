import { Controller, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


// const createAccountBodySchema = z.object({
//     name: z.string().min(1, "Name is required"),
//     email: z.email("Invalid email format"),
//     password: z.string().min(6, "Password must be at least 6 characters long"),
// });

// type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;



@Controller("/sessions")
export class AuthenticateController {
  constructor(private jwt: JwtService) {}

  @Post()
//   @HttpCode(201)
//   @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle() {
    const token = this.jwt.sign({ sub: 'user-id' })
    return token
  }
}
