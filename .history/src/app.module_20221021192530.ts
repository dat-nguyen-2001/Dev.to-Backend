import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesModule } from './articles/articles.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';
import entities from './typeorm';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: entities,
        synchronize: false,
        ssl: {
          rejectUnauthorized: false,
        }
      }),
      inject: [ConfigService],
    }),
    ArticlesModule,
    LikesModule,
    CommentsModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
