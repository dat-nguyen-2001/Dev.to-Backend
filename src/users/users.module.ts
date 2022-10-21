import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User } from 'src/typeorm/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: "datlinh1",
    signOptions: {
      expiresIn: 3600
    }
  }),],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class UsersModule { }
