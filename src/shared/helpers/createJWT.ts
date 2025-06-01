import * as jose from 'jose';
import * as crypto from 'node:crypto';
import { TokenPayload } from '../types/token-payload.type.js';

export async function createJWT(algorithm: string, jwtSecret: string, payload: TokenPayload): Promise<string> {
  return new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
}
