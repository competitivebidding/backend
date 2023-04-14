import { Test, TestingModule } from '@nestjs/testing'
import { BidsResolver } from './bids.resolver'

describe('BidsResolver', () => {
    let resolver: BidsResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BidsResolver],
        }).compile()

        resolver = module.get<BidsResolver>(BidsResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
