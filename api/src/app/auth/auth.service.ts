import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { AdminTokenPayload } from './auth.interface';

type NonceStore = Map<string, number>;

const NONCE_TTL_MS = 5 * 60 * 1000;
const nonces: NonceStore = new Map();

const allowedChainIds = (process.env.AUTH_ALLOWED_CHAIN_IDS || '1')
  .split(',')
  .map((v) => parseInt(v, 10))
  .filter((v) => !Number.isNaN(v));

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  consumeNonce(nonce: string) {
    const exp = nonces.get(nonce);
    if (!exp || Date.now() > exp) return false;

    nonces.delete(nonce);
    return true;
  }

  generateNonce() {
    const nonce = randomBytes(16).toString('hex');
    const expiresAt = Date.now() + NONCE_TTL_MS;

    nonces.set(nonce, expiresAt);
    return nonce;
  }

  isAllowedChain(chainId: number) {
    return allowedChainIds.includes(chainId);
  }

 isAllowedDomain(siweDomain: string) {
  const expectedDomain = process.env.AUTH_ALLOWED_DOMAIN ?? "";
  const arrayDomain = expectedDomain.split(",").map(d => d.trim());
  return arrayDomain.includes(siweDomain);
}


  isAllowedForSiweParam(siweParam: string) {
    const siweForArray = process.env.AUTH_ALLOWED_SIWE_FOR.split(',');
    return siweForArray.includes(siweParam);
  }

  signAdminToken(payload: AdminTokenPayload) {
    return this.jwt.sign(payload);
  }

  signToken(payload: { address: string }) {
    return this.jwt.sign(payload);
  }
}
