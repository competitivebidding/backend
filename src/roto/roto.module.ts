import { Module } from '@nestjs/common'
import { CreditCardModule } from './creditCard/credit-card.module'
import { TransactionModule } from './transaction/transaction.module'

@Module({
    imports: [CreditCardModule, TransactionModule],
})
export class RotoModule {}
