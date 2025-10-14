import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class SharedSecretGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const headers = request.headers;
    const correctKey = process.env.CROMA_PRESALE_SHARED_SECRET_KEY;
    const apiKey = headers['x-shared-key'];

    if (!apiKey)
      throw new UnauthorizedException(
        'Server misconfigured: missing shared secret key',
      );

    if (apiKey !== correctKey)
      throw new UnauthorizedException('Invalid shared secret key');

    return true;
  }
}
