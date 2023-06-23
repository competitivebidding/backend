import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { IncomingMessage } from 'http'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload, JwtPayloadWithRefreshToken } from '../utils/types'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>('JWT_REFRESH_TOKEN_SECRET'),
            passReqToCallback: true, // dont destroy req object
        })
    }

    async validate(req: IncomingMessage, payload: JwtPayload): Promise<JwtPayloadWithRefreshToken> {
        //const refreshToken = req?.get('authorization')?.replace('Bearer ', '').trim()
        const refreshToken = req.headers.authorization.replace('Bearer', '').trim()

        if (!refreshToken) {
            throw new ForbiddenException('Refresh token malformed')
        }

        console.log('jwt-refresh', { ...payload, refreshToken })
        return { ...payload, refreshToken }
    }
}
