import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Env } from '@/infra/env'
import { JWTStrategy } from './jwt.strategy'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const jwtPrivateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
        const jwtPublicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(jwtPrivateKey, 'base64'),
          publicKey: Buffer.from(jwtPublicKey, 'base64'),
        }
      },
    }),
  ],
  providers: [JWTStrategy],
})
export class AuthModule {}
