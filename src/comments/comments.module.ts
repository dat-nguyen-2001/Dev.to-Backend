import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/typeorm';
import { JwtStrategy } from 'src/users/jwt.strategy';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: "datlinh1",
    signOptions: {
      expiresIn: 3600
    }
  })],
  controllers: [CommentsController],
  providers: [CommentsService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class CommentsModule { }
