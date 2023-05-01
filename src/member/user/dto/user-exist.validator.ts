import { Injectable } from '@nestjs/common'
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { UserService } from '../user.service'

@Injectable()
@ValidatorConstraint({ name: 'IsUserExist', async: true })
export class IsUserExist implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {
        console.log('UserService was Inject')
    }

    async validate(userId: number) {
        //const user = await this.userService.getUserById(userId)
        //return !!user

        //console.log(user)
        console.log('userId=', userId)

        return true
    }

    defaultMessage() {
        return 'User not Found!'
    }
}
