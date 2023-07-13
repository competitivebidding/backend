import { Test, TestingModule } from '@nestjs/testing'
import { TopicTiketService } from './topic-tiket.service'

describe('TopicTiketService', () => {
    let service: TopicTiketService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TopicTiketService],
        }).compile()

        service = module.get<TopicTiketService>(TopicTiketService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
