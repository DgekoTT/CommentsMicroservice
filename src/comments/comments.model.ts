import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface CommentsCreationAttrs {
    displayName: string;
    comment: string;
    filmId: number;
    parentCommentId: number;
}

@Table({tableName: 'comments'})
export class Comments extends Model<Comments, CommentsCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    
    @ApiProperty({example: 'Ivan Ivanov', description: 'имя пользователя'})
    @Column({type: DataType.STRING, allowNull: false})
    displayName: string;

    @ApiProperty({example: 'Какой - то текст', description: 'Комментарий'})
    @Column({type: DataType.TEXT, allowNull: false})
    comment: string;

    @ApiProperty({example: 123, description: 'id фильма к которому оставлен комментарий'})
    @Column({type: DataType.INTEGER, allowNull: false})
    filmId: number;

    @ApiProperty({example: 2341, description: 'Уникальный идентификатор комментируемого комментария. Если нет то null'})
    @Column({type: DataType.INTEGER, allowNull: true})
    parentCommentId: number;
}