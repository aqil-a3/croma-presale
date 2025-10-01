import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SiweMessage } from 'siwe';
import { Response } from 'express';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { SiweForType } from './auth.interface';

type VerifyBody = {
  message: any; // SIWE message object from client
  signature: string; // hex signature
};

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req) {
    return {
      ok: true,
      address: req.user.address,
    };
  }

  @Get('nonce')
  getNonce() {
    const nonce = this.auth.generateNonce();

    return { nonce };
  }

  @Post('verify/:siweFor')
  async verify(
    @Body() body: VerifyBody,
    @Res({ passthrough: true }) res: Response,
    @Param('siweFor') siweFor: SiweForType,
  ) {
    const { message, signature } = body;

    if (!message || !signature)
      throw new BadRequestException('Missing message or signature');

    const cookieDomain = process.env.COOKIE_DOMAIN;
    const isProd = process.env.NODE_ENV === 'production';

    // 1. Bentuk Siwe dari Body
    const siwe = new SiweMessage(message);

    // 2. Validasi domain, chainId, siweFor
    if (!this.auth.isAllowedDomain(siwe.domain))
      throw new BadRequestException(`Invalid domain :${siwe.domain}`);
    if (!this.auth.isAllowedChain(Number(siwe.chainId)))
      throw new BadRequestException(`Chain now allowed :${siwe.chainId}`);
    if (!this.auth.isAllowedForSiweParam(siweFor))
      throw new BadRequestException('Siwe For not allowed');

    // 3. Verifikasi tanda tangan SIWE
    const result = await siwe.verify({
      signature,
      domain: siwe.domain,
      nonce: siwe.nonce,
    });

    if (!result.success)
      throw new BadRequestException('Invalid SIWE signature');

    // 4. Anti-Replay : Nonce harus valid & belum dipakai
    const ok = this.auth.consumeNonce(siwe.nonce);
    if (!ok) throw new BadRequestException('Nonce expired or already used');

    // Terbitkan JWT & set cookie
    const token: Record<SiweForType, string> = {
      croma_presale_dashboard: this.auth.signAdminToken({
        address: siwe.address,
        isAdmin: true,
      }),
    };

    res.cookie(siweFor, token[siweFor], {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'lax' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
      domain: cookieDomain,
    });

    return { ok: true, address: siwe.address };
  }
}
