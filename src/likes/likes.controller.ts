import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateLikeDto } from './likes.dto';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
    constructor(private readonly likesService: LikesService) { }
    @Post()
    async likeArticle(@Req() req: Request,@Body() createLikeDto: CreateLikeDto) : Promise<void> {
        const {articleId} = createLikeDto
        return await this.likesService.likeArticle(req, articleId)
    }

    @Get()
    async getLikedArticles(@Req() req: Request) : Promise<number[]> {
        return await this.likesService.getLikedArticles(req)
    }
}
