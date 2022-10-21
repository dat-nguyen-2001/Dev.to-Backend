import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { Article } from './article.entity';
import { User } from './user.entity';

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'comment_id'
    })
    id: number;

    @Column({ type: 'timestamptz' })
    created_at: Date;

    @Column({
        nullable: false,
        default: '',
    })
    content: string;

    @ManyToOne(() => Article, article => article.comments)
    article: Article

    @ManyToOne(() => User, user => user.comments)
    user: User
}