import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comments} from './comments.model';
import { CommentsService } from './comments.service';
import { CommentsDto } from './dto/comments.dto';
import { UpdateCommentDto } from './dto/updateCommentDto';
import {Roles} from "../Guards/roles-auth.decorator";
import {RolesGuard} from "../Guards/role.guard";

@ApiTags('Комментарии')
@Controller('comments')
export class CommentsController {
    constructor(//@Inject('COMMENTS_EXCHANGE') private client: ClientProxy,
                private commentsService:  CommentsService) {

    }

    @ApiOperation({summary: 'Показать комментарии к фильму по id фильма'})
    @ApiResponse({status: 200, type: Comments})
   // @UseGuards(AuthUserGuard)
    @Get('/:filmId')
    getCommentsByFilmId(@Param('filmId') filmId: number){
        return this.commentsService.getCommentsByFilmId(filmId);
    }

    @Roles("admin", "user")
    @UseGuards(RolesGuard)
    @ApiOperation({summary: 'Создать комментарий'})
    @Post()
    createComments(@Body() commentsDto: CommentsDto,
                   @Req() request: Request) {
        const refreshToken= (request as any).cookies.refreshToken
        return this.commentsService.createComment(commentsDto, refreshToken);
    }

    @Roles("admin", "user")
    @UseGuards(RolesGuard)
    @ApiOperation({summary: 'Изменить комментарий'})
    @Put('/update')
    updateComment(@Body() updateCommentDto: UpdateCommentDto) {
        return this.commentsService.updateComment(updateCommentDto);
    }

    @Roles("admin", "user")
    @UseGuards(RolesGuard)
    @ApiOperation({summary: 'Удалить комментарий по его id'})
    @Delete('/:commentId')
    deleteCommentById(@Param('commentId') commentId: number) {
        return this.commentsService.deleteComment(commentId);
    }
}
