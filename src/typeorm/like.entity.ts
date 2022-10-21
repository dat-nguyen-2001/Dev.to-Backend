import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Like extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: number;

    @Column()
    userId: number;

    @Column()
    articleId: number;

}