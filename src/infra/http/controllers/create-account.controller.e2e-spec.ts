import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create Account Controller (E2E)', () => {
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

  test('[POST] /accounts', async () => {
    await request(app.getHttpServer())
      .post('/accounts')
      .send({
        name: 'Test Account',
        email: 'test@example.com',
        password: 'password123',
      })
      .expect(201)

    const userOnDatabase = await prisma.user.findUnique({
      where: { email: 'test@example.com' },
    })
    expect(userOnDatabase).toBeTruthy()
    expect(userOnDatabase?.email).toBe('test@example.com')
    expect(userOnDatabase?.name).toBe('Test Account')
    expect(userOnDatabase?.password).not.toBe('password123')
    expect(userOnDatabase?.id).toBeDefined()
  })
})
