import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';
import {configObject} from './config.object';
import {ConfigService } from '@nestjs/config';

async function bootstrap() {
  //const serverConfig = config.get('server');
  //console.log(typeOrmConfig.database);
  /*console.log(process.env);
  console.log(process.env.DB_NAME);*/
  const app = await NestFactory.create(AppModule);

  if(process.env.NODE_ENV === 'development'){
    app.enableCors();
  }
  else
  {
    app.enableCors();
  }
  const port = configObject.port;
  await app.listen(port);
  const logger=new Logger();
  logger.verbose("Listening on port "+port);
  
}
bootstrap();
