import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsDto } from './dto/comments.dto';
import { UpdateCommentDto } from './dto/updateCommentDto';

@Controller('comments')
export class CommentsController {
    constructor(private commentsService:  CommentsService) {

    }

    @Post()
    createComments(@Body() commentsDto: CommentsDto) {
        return this.commentsService.createComment(commentsDto);
    }

    @Put('/update')
    updateComment(@Body() updateCommentDto: UpdateCommentDto) {
        return this.commentsService.updateComment(updateCommentDto);
    }
}
