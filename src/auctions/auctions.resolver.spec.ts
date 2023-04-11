import { Test, TestingModule } from '@nestjs/testing'
import { AuctionsResolver } from './auctions.resolver'

describe('AuctionsResolver', () => {
    let resolver: AuctionsResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuctionsResolver],
        }).compile()

        resolver = module.get<AuctionsResolver>(AuctionsResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
