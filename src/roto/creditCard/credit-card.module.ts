import { Module } from '@nestjs/common'
import { CreditCardResolver } from './credit-card.resolver'
import { CreditCardService } from './credit-card.service'

@Module({
    providers: [CreditCardResolver, CreditCardService],
})
export class CreditCardModule {}
