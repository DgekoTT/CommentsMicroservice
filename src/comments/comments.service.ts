import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comments } from './comments.model';
import { CommentsDto } from './dto/comments.dto';
import { UpdateCommentDto } from './dto/updateCommentDto';
import {JwtService} from "@nestjs/jwt";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UserInfo } from './interfaces/userInfo.interfaces';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comments) private commentsRepository: typeof Comments,
                @Inject(CACHE_MANAGER) private cacheManager: Cache,
                private jwtService: JwtService) {

    }
    async getCommentsByFilmId(filmId: number) : Promise<Comments[]> {
        let cacheFilmComments = await this.cacheManager.get<Comments[]>(`filmComments:${filmId}`);

        if (cacheFilmComments) return cacheFilmComments;
        
        const filmComments = await this.commentsRepository.findAll({ where: { filmId } });
        
        if (!filmComments?.length) {
            throw new HttpException(`Комментарии к фильму с id = ${filmId} не найдены`, HttpStatus.NOT_FOUND);
          }
        
        await this.cacheManager.set(`filmComments:${filmId}`, filmComments);
        
        return filmComments;
    }

    async createComment(dto: CommentsDto, refreshToken: string): Promise<void> {
        const user = await this.getInfo(refreshToken);
        dto.displayName = user.displayName;
        await this.commentsRepository.create(dto)
        // redirect на страницу фильма и как раз появиться новый комментарий
    }

    async updateComment(dto: UpdateCommentDto, refreshToken: string) : Promise<void>  {
        //let comment = await this.commentsRepository.findOne({where: {id: dto.commentId}});
        const user = this.getInfo(refreshToken);

        let comment = await this.commentsRepository.findOne({where: {id: dto.commentId}});

        this.checkAvailability(comment, user)

        await this.commentsRepository.update({comment: dto.comment}, {where: {id: dto.commentId}});
    }

    async deleteComment(commentId: number, refreshToken: string) : Promise<void>  {
        const user = this.getInfo(refreshToken);

        let comment = await this.commentsRepository.findOne({where: {id: commentId}});

        this.checkAvailability(comment, user)

        await this.commentsRepository.destroy({where: {id: commentId}});
    }

    private getInfo(refreshToken: string) : Promise<UserInfo> {
        return this.jwtService.verify(refreshToken, {secret: "FFFGKJKFWMV"});
    }

    checkAvailability(comment: Comments, user: any) : void {
        if (!comment) {
            throw new HttpException('Комментарий не найден', HttpStatus.NOT_FOUND);
        }
        if (comment.displayName !== user.displayName) {
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
        }
    }


}
