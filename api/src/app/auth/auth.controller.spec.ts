import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Mock class SiweMessage (mengganti import 'siwe')
jest.mock('siwe', () => {
  return {
    SiweMessage: jest.fn().mockImplementation((msg: any) => ({
      ...msg,
      // default verify: success, bisa dioverride per test
      verify: jest.fn().mockResolvedValue({ success: true }),
    })),
  };
});

describe('AuthController', () => {
  let controller: AuthController;
  let authService: {
    generateNonce: jest.Mock;
    consumeNonce: jest.Mock;
    isAllowedChain: jest.Mock;
    signToken: jest.Mock;
  };

  const mockRes = () =>
    ({
      cookie: jest.fn(),
    }) as any;

  beforeEach(async () => {
    process.env.AUTH_ALLOWED_DOMAIN = 'localhost:3000';
    process.env.AUTH_ALLOWED_CHAIN_IDS = '1,137';
    process.env.COOKIE_DOMAIN = 'localhost';
    process.env.NODE_ENV = 'test';

    authService = {
      generateNonce: jest.fn().mockReturnValue('nonce-123'),
      consumeNonce: jest.fn().mockReturnValue(true),
      isAllowedChain: jest.fn().mockReturnValue(true),
      signToken: jest.fn().mockReturnValue('signed.jwt.token'),
    } as any;

    const mod = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: JwtService, useValue: { sign: jest.fn() } },
      ],
    }).compile();

    controller = mod.get(AuthController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('GET /auth/nonce returns nonce', () => {
    const data = controller.getNonce();
    expect(data).toEqual({ nonce: 'nonce-123' });
    expect(authService.generateNonce).toHaveBeenCalled();
  });

  it('POST /auth/verify success sets cookie & returns address', async () => {
    const res = mockRes();

    const body = {
      message: {
        domain: 'localhost:3000',
        chainId: 1,
        nonce: 'nonce-123',
        address: '0xA1b2C3',
      },
      signature: '0xSIG',
    };

    const result = await controller.verify(body as any, res);
    expect(authService.isAllowedChain).toHaveBeenCalledWith(1);
    expect(authService.consumeNonce).toHaveBeenCalledWith('nonce-123');
    expect(authService.signToken).toHaveBeenCalledWith({ address: '0xA1b2C3' });

    // cookie diset
    expect(res.cookie).toHaveBeenCalledWith(
      'auth_token',
      'signed.jwt.token',
      expect.objectContaining({
        httpOnly: true,
        sameSite: 'lax',
        domain: 'localhost',
        path: '/',
      }),
    );

    expect(result).toEqual({ ok: true, address: '0xA1b2C3' });
  });

  it('rejects when domain mismatch', async () => {
    const res = mockRes();
    const body = {
      message: { domain: 'evil.com', chainId: 1, nonce: 'n', address: '0x0' },
      signature: '0xSIG',
    };
    await expect(controller.verify(body as any, res)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('rejects when chain is not allowed', async () => {
    authService.isAllowedChain.mockReturnValue(false);
    const res = mockRes();
    const body = {
      message: {
        domain: 'localhost:3000',
        chainId: 999,
        nonce: 'n',
        address: '0x0',
      },
      signature: '0xSIG',
    };
    await expect(controller.verify(body as any, res)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('rejects when SIWE verify fails', async () => {
    // override verify to fail
    const { SiweMessage } = jest.requireMock('siwe');
    (SiweMessage as any).mockImplementation((msg: any) => ({
      ...msg,
      verify: jest.fn().mockResolvedValue({ success: false }),
    }));

    const res = mockRes();
    const body = {
      message: {
        domain: 'localhost:3000',
        chainId: 1,
        nonce: 'n',
        address: '0x0',
      },
      signature: '0xSIG',
    };
    await expect(controller.verify(body as any, res)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('rejects when nonce already used/expired', async () => {
    authService.consumeNonce.mockReturnValue(false);
    const res = mockRes();
    const body = {
      message: {
        domain: 'localhost:3000',
        chainId: 1,
        nonce: 'n',
        address: '0x0',
      },
      signature: '0xSIG',
    };
    await expect(controller.verify(body as any, res)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
