import { TypeNotifi } from '@prisma/client'

export default class NotifiInput {
    userId: number
    auctionId: number
    typeNotifi: TypeNotifi
    message: string
}
