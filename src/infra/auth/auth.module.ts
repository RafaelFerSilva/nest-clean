import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JWTStrategy } from "./jwt.strategy";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { EnvService } from "../env/env.service";
import { EnvModule } from "../env/env.module";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory(env: EnvService) {
        const PrivateKey = env.get("JWT_PRIVATE_KEY");
        const PublicKey = env.get("JWT_PUBLIC_KEY");

        return {
          signOptions: { algorithm: "RS256" },
          privateKey: Buffer.from(PrivateKey, "base64"),
          publicKey: Buffer.from(PublicKey, "base64"),
        };
      },
    }),
  ],
  providers: [
    JWTStrategy,
    EnvService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
