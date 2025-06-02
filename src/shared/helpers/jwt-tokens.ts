import { SignJWT } from 'jose';

const JWT_EXPIRED = '3d';

export async function getToken(tokenData: Record<string, string>, secretKey: string): Promise<string> {
  const secretBytes = new TextEncoder().encode(secretKey);

  const accessToken = await new SignJWT(tokenData)
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRED)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(secretBytes);

  return accessToken;
}
