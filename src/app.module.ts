import { Module } from '@nestjs/common';
import { PlayerModule } from './modules/player/player.module';

@Module({
  imports: [PlayerModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    this.init();
  }

  private init() {
    process
      .on('unhandledRejection', (reason: RangeError, promise) => {
        promise.catch(e => {
          console.log(`unhandledRejection ${e.code} ${e.message}`);
          process.exit(1);
        })
      })
      .on('uncaughtException', (err: Error) => {
        console.log('uncaughtException', err.message);
        process.exit(1);
      });
  }
}
