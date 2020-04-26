import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { IdGeneratorMiddleware } from './middlewares/id-generator.middleware';
import { PlayerStoreMapper } from './data-access/playerStoreMapper';

@Module({
  controllers: [PlayerController],
  providers: [
    PlayerService,
    PlayerStoreMapper,
  ]
})
export class PlayerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IdGeneratorMiddleware)
      .forRoutes({ path: 'player', method: RequestMethod.POST });
  }
}
