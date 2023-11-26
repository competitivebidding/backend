import { Test, TestingModule } from '@nestjs/testing'
import { MessageTiketResolver } from './message-tiket.resolver'
import { MessageTiketService } from './message-tiket.service'

describe('MessageTiketResolver', () => {
    let resolver: MessageTiketResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MessageTiketResolver, MessageTiketService],
        }).compile()

        resolver = module.get<MessageTiketResolver>(MessageTiketResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
