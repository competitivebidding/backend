import { Args, Int, Mutation, Resolver } from '@nestjs/graphql'
import { Roles } from '../auth/decorators'
import { Token } from '../token/entities/token.entity'
import { TokenService } from '../token/token.service'
import { CreateTokenInput } from './dto/create-token.input'
import { UpdateTokenInput } from './dto/update-token.input'

@Resolver(() => Token)
export class TokenResolver {
    constructor(private readonly tokenService: TokenService) {}

    @Mutation(() => Token, { nullable: true })
    async getTokenById(@Args('id', { type: () => Int }) id: number): Promise<Token> {
        const token = await this.tokenService.getTokenById(id)
        if (!token) {
            throw new Error('Token not found')
        }

        return token
    }

    @Roles('ADMIN')
    @Mutation(() => Token, { nullable: true })
    async createToken(@Args('data') data: CreateTokenInput): Promise<Token> {
        console.log(data)
        return await this.tokenService.createToken(data)
    }

    @Mutation(() => Token, { nullable: true })
    async updateToken(
        @Args('id', { type: () => Int }) id: number,
        @Args('data') data: UpdateTokenInput,
    ): Promise<Token> {
        const token = await this.tokenService.getTokenById(id)
        if (!token) {
            throw new Error('Token not found')
        }

        const updatedToken = await this.tokenService.updateToken(id, data)

        return updatedToken
    }

    @Mutation(() => Boolean)
    async deleteToken(@Args('id', { type: () => Int }) id: number) {
        const token = await this.tokenService.getTokenById(id)

        if (!token) {
            throw new Error('tokens not found')
        }

        await this.tokenService.deleteToken(id)

        return true
    }
}
