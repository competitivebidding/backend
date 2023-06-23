import { Test, TestingModule } from '@nestjs/testing'
import { BidResolver } from './bid.resolver'
import { BidService } from './bid.service'

describe('BidResolver', () => {
    let resolver: BidResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BidResolver, BidService],
        }).compile()

        resolver = module.get<BidResolver>(BidResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
