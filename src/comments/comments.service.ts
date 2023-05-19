import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comments } from './comments.model';
import { CommentsDto } from './dto/comments.dto';
import { UpdateCommentDto } from './dto/updateCommentDto';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comments) private commentsRepository: typeof Comments,
                private jwtService: JwtService) {

    }
    async getCommentsByFilmId(filmId: number) : Promise<Comments[]> {
        let filmComments = await this.commentsRepository.findAll({where: {filmId: filmId}});
        if(!filmComments?.length) {
            throw new HttpException(`Комментарии к фильму с id = ${filmId} не найдены`, HttpStatus.NOT_FOUND);
        }
        return filmComments;
    }

    async createComment(dto: CommentsDto, refreshToken: string): Promise<void> {
        const user = this.jwtService.verify(refreshToken, {secret: "FFFGKJKFWMV"});
        dto.displayName = user.displayName;
        await this.commentsRepository.create(dto)
        // redirect на страницу фильма и как раз появиться новый комментарий
    }

    async updateComment(dto: UpdateCommentDto) : Promise<void>  {
        let comment = await this.commentsRepository.findOne({where: {id: dto.commentId}});
        if (!comment) {
            throw new HttpException('Комментарий не найден', HttpStatus.NOT_FOUND);
        }
        await this.commentsRepository.update({comment: dto.comment}, {where: {id: dto.commentId}});
    }

    async deleteComment(commentId: number) : Promise<void>  {
        let Comment = await this.commentsRepository.findOne({where: {id: commentId}});
        if(!Comment) {
            throw new HttpException('Комментарий не найден', HttpStatus.NOT_FOUND);
        } 
        await this.commentsRepository.destroy({where: {id: commentId}});
    }

}
