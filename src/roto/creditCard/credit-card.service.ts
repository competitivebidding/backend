import { Injectable } from '@nestjs/common'
import { CreateRotoInput } from './dto/create-roto.input'
import { UpdateRotoInput } from './dto/update-roto.input'

@Injectable()
export class CreditCardService {
    create(createRotoInput: CreateRotoInput) {
        return 'This action adds a new roto'
    }

    findAll() {
        return `This action returns all roto`
    }

    findOne(id: number) {
        return `This action returns a #${id} roto`
    }

    update(id: number, updateRotoInput: UpdateRotoInput) {
        return `This action updates a #${id} roto`
    }

    remove(id: number) {
        return `This action removes a #${id} roto`
    }
}
