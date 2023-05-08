import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../database/prisma.service'
import { Referral, ReferralUser } from './entities'

@Injectable()
export class ReferralService {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.UserReferralCreateInput): Promise<Referral> {
        return await this.prisma.userReferral.create({
            data,
        })
    }

    async getAllRefferalsUserByUserId(userId: number): Promise<ReferralUser[]> {
        return await this.prisma.user.findMany({
            where: {
                referrals: {
                    some: {
                        userReferrerId: userId,
                    },
                },
            },
            select: {
                id: true,
                cuid: true,
                email: true,
                username: true,
                createdAt: true,
            },
        })
    }
}
