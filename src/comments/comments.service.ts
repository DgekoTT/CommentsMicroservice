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
    async getCommentsByFilmId(filmId: number) {
        let findedFilm = await this.commentsRepository.findAll({where: {filmId: filmId}});
        if(Object.keys(findedFilm).length === 0) {
            throw new HttpException(`Комментарии к фильму с id = ${filmId} не найдены`, HttpStatus.NOT_FOUND);
        }
        return findedFilm;
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

    async deleteComment(commentId: number) {
        let findedComment = await this.commentsRepository.findOne({where: {id: commentId}});
        if(!findedComment) {
            throw new HttpException('Комментарий не найден', HttpStatus.NOT_FOUND);
        } 
        await this.commentsRepository.destroy({where: {id: commentId}});
    }

    }
