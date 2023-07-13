import { Test, TestingModule } from '@nestjs/testing'
import { MessageTiketService } from './message-tiket.service'

describe('MessageTiketService', () => {
    let service: MessageTiketService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MessageTiketService],
        }).compile()

        service = module.get<MessageTiketService>(MessageTiketService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
