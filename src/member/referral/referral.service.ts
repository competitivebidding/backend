import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { CreateReferralInput } from './dto/create-referral.input'
import { UpdateReferralInput } from './dto/update-referral.input'

@Injectable()
export class ReferralService {
    constructor(private prisma: PrismaService) {}

    async create(createReferralInput: CreateReferralInput) {
        return 'This action adds a new referral'
    }

    async findAll() {
        return this.prisma.userReferral.findMany()
    }

    async findOne(id: number) {
        return `This action returns a #${id} referral`
    }

    async update(id: number, updateReferralInput: UpdateReferralInput) {
        return `This action updates a #${id} referral`
    }

    async remove(id: number) {
        // return this.prisma.userReferral.delete({
        //     where,
        // })
    }
}
