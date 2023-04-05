import { Injectable } from '@nestjs/common';
import { hash, genSalt } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


const secret = process.env.JWT_SECRET;
@Injectable()
export class AuthService {
    constructor(private jwt: JwtService) {}

    async encodePassword(password: string): Promise<string> {
        const saltRounds = 10;
        const salt = await genSalt(saltRounds);
        return hash(password, salt);
    }

    async generateToken(userName: string | object | Buffer): Promise<string> {
        return this.jwt.signAsync(userName, { secret: secret });
    }

    validateRequestToken(request: Request): string | null {
        const authorization = request.headers['authorization'];
        if (!authorization || Array.isArray(authorization)) {
            return null;
        }
        const [_, token] = authorization.split(' ');
        return token;
    }

    async verifyRequestToken(token: string): Promise<string | null> {
        try {
            const payload = this.jwt.verifyAsync(
                token,
                {
                    secret: secret
                }
            );
            return payload;
        } catch {
            return null
        }
    }



}
