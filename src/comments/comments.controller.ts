import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateCommentDto } from 'src/dtos/create-comment.dto';
import { Comment } from 'src/typeorm';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }
    @Post() 
    async createComment(@Req() req: Request, @Body() createCommentDto: CreateCommentDto) : Promise<void> {
        return await this.commentsService.createComment(req, createCommentDto)
    }

    @Get()
    async getComments(articleId: number) : Promise<Comment[]> {
        return await this.commentsService.getComments(articleId)
    }
}
