import * as crypto from 'node:crypto';

export function createSHA256(line: string, salt: string) {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
}
