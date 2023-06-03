import { Test, TestingModule } from '@nestjs/testing'
import { StatusResolver } from './status.resolver'
import { StatusService } from './status.service'

describe('StatusResolver', () => {
    let resolver: StatusResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StatusResolver, StatusService],
        }).compile()

        resolver = module.get<StatusResolver>(StatusResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
