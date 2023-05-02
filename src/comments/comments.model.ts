import { Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";

interface CommentsCreationAttrs {
    email: string;
    comment: string;

}

@Table({tableName: 'comments'})
export class CommentsModel extends Model<CommentsModel, CommentsCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    
    @Column({type: DataType.STRING, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    comment: string;

    
}