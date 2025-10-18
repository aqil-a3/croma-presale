import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.use('/investment/payments/webhook', bodyParser.json({
    verify: (req: any, res, buf) => {
      req.rawBody = buf.toString();
    }
  }));

  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'https://croma-presale.vercel.app',
      'https://cromaart.vercel.app/',
      'https://cromaart.io/',
    ],
  });

  // ambil instance Express di balik Nest
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', 1);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
