import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as environment from './environments/environment';

async function bootstrap() {
  let env = environment[process.env.NODE_ENV] || environment['dev'];
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(env.prefix);

  await app.listen(process.env.PORT || env.port).catch(e => {
    console.log(e);
  });
  console.log('APP HAS BEEN STARTED');
}
bootstrap();
