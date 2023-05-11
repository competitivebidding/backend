import { Args, Int, Mutation, Resolver } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { Roles } from '../auth/decorators'
import { Token } from '../token/entities/token.entity'
import { TokenService } from '../token/token.service'

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
    async createToken(@Args('data') data: Prisma.TokenCreateInput): Promise<Token> {
        const createToken = await this.tokenService.createToken(data)

        return createToken
    }

    @Roles('ADMIN')
    @Mutation(() => Token, { nullable: true })
    async updateToken(
        @Args('id', { type: () => Int }) id: number,
        @Args('data') data: Prisma.TokenUpdateInput,
    ): Promise<Token> {
        const token = await this.tokenService.getTokenById(id)
        if (!token) {
            throw new Error('Token not found')
        }

        const updatedToken = await this.tokenService.updateToken(id, data)

        return updatedToken
    }

    @Roles('ADMIN')
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
