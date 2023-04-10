import { Inject, Injectable } from '@nestjs/common'
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { UsersService } from '../users.service'

@Injectable()
@ValidatorConstraint({ name: 'IsUserExist', async: true })
export class IsUserExist implements ValidatorConstraintInterface {
    constructor(@Inject(UsersService) private readonly usersService: UsersService) {
        console.log('UsersService  Inject')
    }

    async validate(userId: number) {
        //const user = await this.usersService.getUser(userId)
        //return !!user

        //console.log(this.usersService)
        console.log('userId=', userId)

        return true
    }

    defaultMessage() {
        return 'User not Found!'
    }
}
