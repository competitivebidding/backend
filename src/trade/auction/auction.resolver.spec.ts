import { Test, TestingModule } from '@nestjs/testing'
import { AuctionResolver } from './auction.resolver'
import { AuctionService } from './auction.service'

describe('AuctionResolver', () => {
    let resolver: AuctionResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuctionResolver, AuctionService],
        }).compile()

        resolver = module.get<AuctionResolver>(AuctionResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
