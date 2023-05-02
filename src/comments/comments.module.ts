import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentsModel } from './comments.model';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports:[
      SequelizeModule.forFeature([CommentsModel])
  ],
  exports: [
    CommentsService
  ]
})
export class CommentsModule {}
