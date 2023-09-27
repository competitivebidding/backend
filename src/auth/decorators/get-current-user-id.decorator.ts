import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtPayload } from '../utils/types'

export const GetCurrentUserId = createParamDecorator((_: undefined, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req
    const user = request.user as JwtPayload
    return user.userId
})
