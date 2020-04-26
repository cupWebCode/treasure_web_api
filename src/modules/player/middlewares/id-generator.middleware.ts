import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as uuidv1 from "uuid/v1";

@Injectable()
export class IdGeneratorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    req.body.player_id = uuidv1();
    next();
  }
}
