import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ApiCookieAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
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
    @Get('filmId/:filmId')
    getCommentsByFilmId(@Param('filmId') filmId: number){
        return this.commentsService.getCommentsByFilmId(filmId);
    }

    @ApiCookieAuth()
    @Roles("admin", "user")
    @UseGuards(RolesGuard)
    @ApiOperation({summary: 'Создать комментарий'})
    @ApiResponse({status: 200, description: 'Успешный запрос, будем делать риерект ?', type: String, isArray: false})
    @Post()
    createComments(@Body() commentsDto: CommentsDto,
                   @Req() request: Request) {
        const refreshToken= (request as any).cookies.refreshToken
        return this.commentsService.createComment(commentsDto, refreshToken);
    }

    @ApiCookieAuth()
    @Roles("admin", "user")
    @UseGuards(RolesGuard)
    @ApiOperation({summary: 'Изменить комментарий'})
    @ApiResponse({status: 200, description: 'Успешный запрос', type: String, isArray: false})
    @Put('/update')
    updateComment(@Body() updateCommentDto: UpdateCommentDto,
                  @Req() request: Request) {
        const refreshToken = (request as any).cookies.refreshToken;
        return this.commentsService.updateComment(updateCommentDto, refreshToken);
    }

    @ApiCookieAuth()
    @Roles("admin", "user")
    @UseGuards(RolesGuard)
    @ApiOperation({summary: 'Удалить комментарий по его id'})
    @ApiResponse({status: 200, description: 'Успешный запрос', type: String, isArray: false})
    @Delete('comId/:commentId')
    deleteCommentById(@Param('commentId') commentId: number,
                      @Req() request: Request) {
        const refreshToken = (request as any).cookies.refreshToken;             
        return this.commentsService.deleteComment(commentId, refreshToken);
    }
}
