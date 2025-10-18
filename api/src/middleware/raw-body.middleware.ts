import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (req.originalUrl.startsWith('/investment/payments/webhook')) {
      bodyParser.json({
        verify: (req: any, res, buf) => {
          req.rawBody = buf.toString();
        },
      })(req, res, next);
    } else {
      next();
    }
  }
}
