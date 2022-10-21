import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Article } from 'src/typeorm';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/users/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: "datlinh1",
    signOptions: {
      expiresIn: 3600
    }
  })],
  controllers: [ArticlesController],
  providers: [ArticlesService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class ArticlesModule {}
