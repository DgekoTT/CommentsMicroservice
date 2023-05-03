import { ApiProperty } from "@nestjs/swagger";

export class CommentsDto {
    @ApiProperty({example: 'user@user.ru', description: 'Уникальный email пользователя'})
    readonly email: string;

    @ApiProperty({example: 'Какой - то текст', description: 'Комментарий'})
    readonly comment: string;

    @ApiProperty({example: '123', description: 'id фильма к которому оставлен комментарий'})
    readonly filmId: number;
}