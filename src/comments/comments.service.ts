import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CreateCommentDto } from 'src/dtos/create-comment.dto';
import { Article, Comment, User } from 'src/typeorm';

@Injectable()
export class CommentsService {
    constructor(
        private jwtService: JwtService,
    ) {
    }
    async extractIdFromReq(req: Request) {
        const authorizationHeader = req.headers['authorization'];
        const token = authorizationHeader.split(' ')[1];
        if (!token) { console.log('Cannot get token'); return }
        const data = await this.jwtService.verify(token, { secret: process.env.ACCESS_TOKEN_SECRET });
        const email = data.email;
        const user = await User.findOne({ where: { email } })
        const userId = Number(user.id);
        return userId
    }

    async createComment(req: Request, createCommentDto: CreateCommentDto) : Promise<void> {
        const {content, articleId} = createCommentDto;
        const userId = await this.extractIdFromReq(req);
        const user = await User.findOne({where: {id: userId}});
        const article = await Article.findOne({where: {id: articleId}})
        const newComment = new Comment();
        newComment.created_at = new Date();
        newComment.content = content;
        newComment.user = user;
        newComment.article = article;
        await newComment.save()
    }

    async getComments(articleId: number) : Promise<Comment[]> {
        const comments = await Comment.find({where: {article: {id: articleId}}, relations: {user: true}})
        return comments;
    }
}
