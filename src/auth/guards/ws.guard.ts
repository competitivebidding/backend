import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class WebSocketAuthGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private readonly jwtService: JwtService) {
        super()
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const client = context.switchToWs().getClient()
        const token = client.handshake.query?.token
        console.log(token)

        try {
            const user = this.jwtService.verify(token, {
                secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            })

            context.switchToWs().getData().user = user

            if (!user) {
                return false
            }

            return true
        } catch (e) {
            //   throw new WsException('Invalid token');
            throw new Error('error')
        }
    }
}
