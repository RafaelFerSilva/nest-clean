import { AppModule } from "@/app.module";
import { PrismaService } from "@/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { hash } from "bcryptjs";
import request from "supertest";

describe("Fetch Recent Questions Controller (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get<PrismaService>(PrismaService);
    jwt = moduleRef.get<JwtService>(JwtService);
    await app.init();
  });

  test("[GET] /questions", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Test Account",
        email: "test@example.com",
        password: await hash("123456", 8),
      },
    });

    const accessToken = jwt.sign({ sub: user.id });

    await prisma.question.createMany({
      data: [
        {
          title: "Sample Question Title 1",
          slug: "sample-question-title-1",
          content: "This is a sample question content 1.",
          authorId: user.id
        },
        {
          title: "Sample Question Title 2",
          slug: "sample-question-title-2",
          content: "This is a sample question content 2.",
          authorId: user.id
        },
        {
          title: "Sample Question Title 3",
          slug: "sample-question-title-3",
          content: "This is a sample question content 3.",
          authorId: user.id
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get("/questions")
      .set('Authorization', `Bearer ${accessToken}`)
      .send()
      .expect(200);
    
    expect(response.body).toBeTruthy();
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: 'Sample Question Title 1' }),
        expect.objectContaining({ title: 'Sample Question Title 2' }),
        expect.objectContaining({ title: 'Sample Question Title 3' })
      ]
    })

    
  });
});
