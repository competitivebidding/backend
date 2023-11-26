import { Test, TestingModule } from '@nestjs/testing'
import { NotificationResolver } from './notification.resolver'
import { NotificationService } from './notification.service'

describe('NotificationController', () => {
    let controller: NotificationResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [NotificationService, NotificationResolver],
        }).compile()

        controller = module.get<NotificationResolver>(NotificationResolver)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
