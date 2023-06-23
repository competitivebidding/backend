import { Module } from '@nestjs/common'
import { AddressModule } from './address/address.module'
import { PaymentModule } from './payment/payment.module'
import { UserModule } from './user/user.module'

@Module({
    providers: [],
    controllers: [],
    exports: [],
    imports: [PaymentModule, AddressModule, UserModule],
})
export class MemberModule {}
