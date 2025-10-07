import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Authenticate Controller (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get<PrismaService>(PrismaService)
    await app.init()
  })

  test('[POST] /sessions', async () => {
    await prisma.user.create({
      data: {
        name: 'Test Account',
        email: 'test@example.com',
        password: await hash('123456', 8),
      },
    })

    const response = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'test@example.com',
        password: '123456',
      })
      .expect(201)

    expect(response.body).toHaveProperty('access_token')
    expect(response.body.access_token).toBeDefined()
    expect(response.body.access_token).toEqual(expect.any(String))
  })
})
