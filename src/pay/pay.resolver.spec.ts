import { Test, TestingModule } from '@nestjs/testing'
import { PayResolver } from './pay.resolver'
import { PayService } from './pay.service'

describe('PayResolver', () => {
    let resolver: PayResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PayResolver, PayService],
        }).compile()

        resolver = module.get<PayResolver>(PayResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
