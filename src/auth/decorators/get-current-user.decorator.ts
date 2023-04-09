import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtPayloadWithRefreshToken } from '../utils/types'

export const GetCurrentUser = createParamDecorator(
    (data: keyof JwtPayloadWithRefreshToken | undefined, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context)
        const request = ctx.getContext().req

        if (data) {
            return request.user[data]
        }

        return request.user
    },
)
