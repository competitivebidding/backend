import { Auction, TypeNotifi } from '@prisma/client'
import { UserPublic } from '../../member/user/dto/user-public.response'

export default class NotifiResponse {
    id: number
    user: UserPublic
    auction: Auction
    read: boolean
    typeNotifi: TypeNotifi
}
