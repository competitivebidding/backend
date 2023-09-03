import { Test, TestingModule } from '@nestjs/testing'
import { RotoService } from './credit-card.service'

describe('RotoService', () => {
    let service: RotoService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RotoService],
        }).compile()

        service = module.get<RotoService>(RotoService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
