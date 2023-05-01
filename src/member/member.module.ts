import { Module } from '@nestjs/common'
import { AddressModule } from './address/address.module'
import { PaymentModule } from './payment/payment.module'
import { ReferralModule } from './referral/referral.module'
import { UserModule } from './user/user.module'

@Module({
    providers: [],
    controllers: [],
    exports: [],
    imports: [PaymentModule, AddressModule, ReferralModule, UserModule],
})
export class MemberModule {}
