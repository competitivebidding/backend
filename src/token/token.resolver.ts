import { Args, Int, Mutation, Resolver } from '@nestjs/graphql'
import { Roles } from '../auth/decorators'
import { Token } from '../token/entities/token.entity'
import { TokenService } from '../token/token.service'
import { CreateTokenInput } from './dto/create-token.input'
import { UpdateTokenInput } from './dto/update-token.input'
import { ItemTokens } from './dto/items-token.response'
import { TokenInput } from './dto/token.input'

@Resolver(() => Token)
export class TokenResolver {
    constructor(private readonly tokenService: TokenService) {}

    @Mutation(() => ItemTokens, { nullable: true })
    async getAllTokens(
        @Args('sortBy', { nullable: true }) sortBy: string,
        @Args('sortOrder', { nullable: true, defaultValue: 'asc' }) sortOrder: 'asc' | 'desc',
        @Args('skip', { nullable: true, type: () => Int, defaultValue: 0 }) skip: number,
        @Args('take', { nullable: true, type: () => Int, defaultValue: 10 }) take: number,
        @Args('where', { nullable: true, defaultValue: {} }) tokenInput: TokenInput,
    ) {
        const orderBy = {
            [sortBy || 'createdAt']: sortOrder,
        }

        const tokens = await this.tokenService.getAllTokens(skip, take, tokenInput, orderBy)

        return {
            items: tokens,
        }
    }

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

    @Roles('ADMIN')
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
