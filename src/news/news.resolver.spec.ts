import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { NewsResolver } from './news.resolver'
import { NewsService } from './news.service'

describe('NewsResolver', () => {
    let app: INestApplication
    let resolver: NewsResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [NewsResolver, NewsService],
        }).compile()

        resolver = module.get<NewsResolver>(NewsResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })

    it('should return all news items', async () => {
        const response = await request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `query {
          news(orderBy: "createdAt_DESC", search: "", skip: 0, take: 10) {
            id
            title
            description
            createdAt
            updatedAt
          }
        }`,
            })
            .expect(200)

        expect(response.body.data.news).toBeDefined()
        expect(response.body.data.news.length).toBeGreaterThan(0)
    })

    it('should return a single news item by ID', async () => {
        const response = await request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `query {
          newsById(id: 1) {
            id
            title
            description
            createdAt
            updatedAt
          }
        }`,
            })
            .expect(200)

        expect(response.body.data.newsById).toBeDefined()
        expect(response.body.data.newsById.id).toEqual(1)
    })

    it('should create a news item', async () => {
        const response = await request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `mutation {
          createNews(
            data: {
              title: "New Article"
              description: "This is a new article"
            }
          ) {
            id
            title
            description
            createdAt
            updatedAt
          }
        }`,
            })
            .expect(200)

        expect(response.body.data.createNews).toBeDefined()
        expect(response.body.data.createNews.title).toEqual('New Article')
    })

    it('should update a news item', async () => {
        const response = await request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `mutation {
          updateNews(
            id: 1
            data: {
              title: "Updated Article"
            }
          ) {
            id
            title
            description
            createdAt
            updatedAt
          }
        }`,
            })
            .expect(200)

        expect(response.body.data.updateNews).toBeDefined()
        expect(response.body.data.updateNews.title).toEqual('Updated Article')
    })

    it('should delete a news item', async () => {
        const response = await request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: `mutation {
          deleteNews(id: 1) {
            id
            title
            description
            createdAt
            updatedAt
          }
        }`,
            })
            .expect(200)

        expect(response.body.data.deleteNews).toBeDefined()
        expect(response.body.data.deleteNews.id).toEqual(1)
    })
})
