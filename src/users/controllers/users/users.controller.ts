import {
    Body,
    Controller,
    Post,
    Get,
    UsePipes,
    ValidationPipe,
    Param,
} from '@nestjs/common';
import { AuthCredentialsDto } from 'src/dtos/auth-credentials.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/typeorm';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get('/:username')
    async getUserInfo(@Param('username') username: string) : Promise<User[]> {
        return await this.userService.getUserInfo(username)
    }

    @Post('signup')
    @UsePipes(ValidationPipe)
    async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<boolean> {
        return await this.userService.signUp(authCredentialsDto);
    }
    @Post('signin')
    @UsePipes(ValidationPipe)
    async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return await this.userService.signIn(authCredentialsDto);
    }

    @Post('profile')
    async changeProfilePicture(@Body() body : {username: string, url: string}) : Promise<void> {
        const {username, url} = body
        return await this.userService.changeProfilePicture(username, url)
    }
}