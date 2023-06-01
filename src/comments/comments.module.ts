import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comments } from './comments.model';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports:[
      SequelizeModule.forFeature([Comments]),
      JwtModule,
      CacheModule.register(),
      // ClientsModule.register([
      //   {
      //     name: 'COMMENTS_EXCHANGE',
      //     transport: Transport.RMQ,
      //     options: {
      //       urls: ['amqp://guest:guest@127.0.0.1:5672'],
      //       queue: 'main_queue',
      //       queueOptions: {
      //         durable: false
      //       },
      //     },
      //   },
      // ]),
  ],
  exports: [
    CommentsService
  ]
})
export class CommentsModule {}
