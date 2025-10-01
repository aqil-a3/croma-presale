import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['croma_presale_token'];
    if (!token) return false;

    try {
      const payload = this.jwt.verify(token);
      request.user = payload;
      return true;
    } catch {
      return false;
    }
  }
}
