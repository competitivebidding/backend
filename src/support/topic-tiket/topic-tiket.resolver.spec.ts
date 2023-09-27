import { Test, TestingModule } from '@nestjs/testing'
import { TopicTiketResolver } from './topic-tiket.resolver'
import { TopicTiketService } from './topic-tiket.service'

describe('TopicTiketResolver', () => {
    let resolver: TopicTiketResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TopicTiketResolver, TopicTiketService],
        }).compile()

        resolver = module.get<TopicTiketResolver>(TopicTiketResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
