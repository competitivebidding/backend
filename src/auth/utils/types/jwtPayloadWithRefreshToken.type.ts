import { JwtPayload } from './jwtPayload.type'

export type JwtPayloadWithRefreshToken = JwtPayload & {
    refreshToken: string
}
