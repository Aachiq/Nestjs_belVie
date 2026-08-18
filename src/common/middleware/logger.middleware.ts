import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.originalUrl}`);
    console.log({
      method: req.method,
      url: req.originalUrl,
      time: new Date().toISOString(),
    });

    // give UniqueID to each request -> by default client send x-request-id in headers so get it else generate newOne.
    // const requestId = req.headers['x-request-id'];
    // const requestId = randomUUID();
    // console.log('randomUUID() :', randomUUID())
    // const requestId = req.headers['x-request-id']?.toString() ?? randomUUID();
    

    // get requestId directly from the created middleaaree that does this reponsibility
    const requestId = req.headers['x-request-id'];
    // console.log(`[${requestId}] ${req.method} ${req.originalUrl}`);

    const start = Date.now();
    res.on('finish', () => {
        console.log(Date.now() - start);
        const duration = Date.now() - start;

        console.log(`[${requestId}] - ${req.method} - ${req.originalUrl} - ${res.statusCode} - ${duration}s`);
    });

    next();
  }
}
