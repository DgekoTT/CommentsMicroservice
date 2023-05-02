import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { where } from 'sequelize';
import { CommentsModel } from './comments.model';
import { CommentsDto } from './dto/comments.dto';
import { UpdateCommentDto } from './dto/updateCommentDto';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(CommentsModel) private commentsRepository: typeof CommentsModel) {

    }

    async createComment(dto: CommentsDto) {
        await this.commentsRepository.create(dto)
    }

    async updateComment(dto: UpdateCommentDto) {
        let commentId = Number(dto.commentId);
        let comment = await this.commentsRepository.findOne({where: {id: commentId}});
        if (!comment) {
            throw new HttpException('Комментарий не найден', HttpStatus.NOT_FOUND);
        }
        await this.commentsRepository.update({comment: dto.comment}, {where: {id: commentId}});
    }
    }
