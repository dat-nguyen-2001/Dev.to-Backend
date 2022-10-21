import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { User } from 'src/typeorm/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from 'src/dtos/auth-credentials.dto';
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from 'src/users/jwt-payload.interface';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
  ) { }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }

  async getUserInfo(username: string): Promise<User[]> {
    return await User.find(
      {
        select: { 'username': true, "articles": true, "profile_pic": true },
        where: { username },
        relations: {
          reading_list: {
            user: true
          },
        }
      }
    )
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<boolean> {
    const { email, password } = authCredentialsDto;
    //check existed user
    const existedUser = await User.find({ where: { email } })
    if (existedUser.length > 0) {
      alert("User already existed!")
      return false;
    }

    const newUser = new User();
    newUser.username = email.split('@')[0];
    newUser.email = email;
    newUser.salt = await bcrypt.genSalt();
    newUser.password = await this.hashPassword(password, newUser.salt);
    newUser.reading_list = [];
    newUser.articles = [];
    newUser.comments = [];
    newUser.profile_pic = ''
    try {
      await newUser.save();
      return true;
    }
    catch (err) {
      alert(err);
      return false
    }
  }

  async signIn(authCredentailDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { email, password } = authCredentailDto;

    // Compare user's input with the database's information
    const res = await User.find({ where: { email } });

    if (!res.length) {
      throw new NotFoundException('User not found!')
    }
    const user = res[0];
    const hashedEnteredPassword = await this.hashPassword(password, user.salt)

    if (hashedEnteredPassword !== user.password) {
      throw new NotFoundException('Wrong password');
    }

    // return the token to use for authorization
    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload, { expiresIn: '3600s', secret: process.env.ACCESS_TOKEN_SECRET })
    return { accessToken }
  }

  async changeProfilePicture(username: string, url: string): Promise<void> {
    const user = await User.findOne(
      {
        where: { username }
      }
    );
    user.profile_pic = url;
    await user.save()
  }
}


