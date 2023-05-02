import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentsModel } from './comments/comments.model';
import { CommentsModule } from './comments/comments.module';
import { CommentsService } from './comments/comments.service';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [CommentsModel],
            autoLoadModels: true
          }),
        CommentsModule
    ]
})
export class AppModule {}
