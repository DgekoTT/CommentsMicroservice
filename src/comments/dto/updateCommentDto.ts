import { ApiProperty } from "@nestjs/swagger";

export class UpdateCommentDto {

    @ApiProperty({example: 123, description: 'id изменяемого комментария'})
    readonly commentId: number;

    @ApiProperty({example: 'Какой-то текст', description: 'Новый текст комментария'})
    readonly comment: string;
}