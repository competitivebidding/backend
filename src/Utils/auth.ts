import { hash, compare, genSalt } from 'bcrypt';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

export const JWT = new JwtService();



export async function comparePasswords(password: string, hashed: string): Promise<boolean> {
    return compare(password, hashed);
}

export async function generateToken(userData: string | object | Buffer, options?: JwtSignOptions): Promise<string> {
    return JWT.signAsync(userData, options);
}
