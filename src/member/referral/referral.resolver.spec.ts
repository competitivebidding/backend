import { Test, TestingModule } from '@nestjs/testing'
import { ReferralResolver } from './referral.resolver'
import { ReferralService } from './referral.service'

describe('ReferralResolver', () => {
    let resolver: ReferralResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReferralResolver, ReferralService],
        }).compile()

        resolver = module.get<ReferralResolver>(ReferralResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
