import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentsModel } from './comments.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports:[
      SequelizeModule.forFeature([CommentsModel]),
      JwtModule
  ],
  exports: [
    CommentsService
  ]
})
export class CommentsModule {}
