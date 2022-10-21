import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/users/jwt.strategy';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { Like } from 'src/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: "datlinh1",
    signOptions: {
      expiresIn: 3600
    }
  })],
  controllers: [LikesController],
  providers: [LikesService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class LikesModule {}
