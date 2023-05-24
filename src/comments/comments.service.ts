import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comments } from './comments.model';
import { CommentsDto } from './dto/comments.dto';
import { UpdateCommentDto } from './dto/updateCommentDto';
import {JwtService} from "@nestjs/jwt";
import {Op} from "sequelize";


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
        dto.displayName = await this.getInfo(refreshToken).displayName;
        await this.commentsRepository.create(dto)
        // redirect на страницу фильма и как раз появиться новый комментарий
    }

    async updateComment(dto: UpdateCommentDto, refreshToken: string) : Promise<void>  {
        const user = this.getInfo(refreshToken);
        await this.checkAuthComments(user, dto.commentId)
        await this.commentsRepository.update({comment: dto.comment}, {where: {id: dto.commentId}});
    }

    async deleteComment(commentId: number, refreshToken: string) : Promise<string>  {
        const user = this.getInfo(refreshToken);
        await this.checkAuthComments(user, commentId)
        return (await this.commentsRepository.destroy({where: {id: commentId}})) ? "Комментарий удален" : 'Ошибка'
    }


    private getInfo(refreshToken: string) {
        return this.jwtService.verify(refreshToken, {secret: "FFFGKJKFWMV"});
    }


    private async checkAuthComments(user: any, commentId: number): Promise<void> {
        const {rows, count}= await this.commentsRepository.findAndCountAll({
            where: {
                [Op.or]: [{ id: commentId}, { displayName: user.displayName },]
            },
        });
        if (rows[0].id != commentId) {
            throw new HttpException('Комментарий не найден', HttpStatus.NOT_FOUND);
        } else if (rows[0].id && rows[0].displayName != user.displayName) {
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
        }
    }
}
