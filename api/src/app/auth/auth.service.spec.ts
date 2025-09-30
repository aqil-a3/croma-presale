import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: { sign: jest.fn().mockReturnValue('signed.jwt.token') },
        },
      ],
    }).compile();

    service = mod.get(AuthService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('generateNonce() should return random hex and be consumable once', () => {
    const nonce = service.generateNonce();
    expect(typeof nonce).toBe('string');
    // 16 bytes -> 32 hex chars
    expect(nonce).toMatch(/^[a-f0-9]{32}$/);

    // pertama kali konsumsi -> true
    expect(service.consumeNonce(nonce)).toBe(true);
    // kedua kali (replay) -> false
    expect(service.consumeNonce(nonce)).toBe(false);
  });

  it('consumeNonce() should return false for unknown nonce', () => {
    expect(service.consumeNonce('deadbeefdeadbeefdeadbeefdeadbeef')).toBe(false);
  });

  it('consumeNonce() should return false if expired', () => {
    // kendalikan waktu
    const t0 = 1_000_000_000; // ms
    const tFuture = t0 + 10 * 60 * 1000; // +10 menit (TTL kita 5 menit)

    const spy = jest.spyOn(Date, 'now')
      .mockReturnValueOnce(t0)       // dipakai saat generateNonce()
      .mockReturnValueOnce(tFuture); // dipakai saat consumeNonce()

    const nonce = service.generateNonce();
    expect(service.consumeNonce(nonce)).toBe(false);

    spy.mockRestore();
  });

  it('signToken() should return jwt string', () => {
    const token = service.signToken({ address: '0xabc' });
    expect(typeof token).toBe('string');
  });
});
