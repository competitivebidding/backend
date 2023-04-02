import { hash, genSalt } from 'bcrypt';

export async function encodePassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    return hash(password, salt);
}
