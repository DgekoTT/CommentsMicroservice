import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";

interface CommentsCreationAttrs {
    email: string;
    comment: string;
    filmId: number;
    parentCommentid: number;
}

@Table({tableName: 'comments'})
export class CommentsModel extends Model<CommentsModel, CommentsCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    
    @ApiProperty({example: 'user@user.ru', description: 'Уникальный email пользователя'})
    @Column({type: DataType.STRING, allowNull: false})
    email: string;

    @ApiProperty({example: 'Какой - то текст', description: 'Комментарий'})
    @Column({type: DataType.STRING, allowNull: false})
    comment: string;

    @ApiProperty({example: '123', description: 'id фильма к которому оставлен комментарий'})
    @Column({type: DataType.INTEGER, allowNull: false})
    filmId: number;

    @ApiProperty({example: '2341', description: 'Уникальный идентификатор комментируемого комментария. Если нет то null'})
    @Column({type: DataType.INTEGER, allowNull: true})
    parentCommentid: number;
}