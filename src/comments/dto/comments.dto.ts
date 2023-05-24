import { ApiProperty } from "@nestjs/swagger";

export class CommentsDto {
    @ApiProperty({example: 'Maki', description: 'Уникальное имя пользователя'})
    displayName?: string;

    @ApiProperty({example: 'Какой - то текст', description: 'Комментарий'})
    readonly comment: string;

    @ApiProperty({example: 123, description: 'id фильма к которому оставлен комментарий'})
    readonly filmId: number;

    @ApiProperty({example: 2341, description: 'Уникальный идентификатор комментируемого комментария. Если нет то null'})
    readonly parentCommentId: number;

}