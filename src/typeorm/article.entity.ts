import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, BaseEntity, ManyToMany } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from './user.entity';
@Entity()
export class Article extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'article_id'
    })
    id: number;

    @Column({ type: 'timestamptz' })
    created_at: Date;

    @Column({
        nullable: false,
        default: '',
    })
    title: string;

    @Column({
        nullable: false,
        default: '',
    })
    content: string;

    @Column({
        nullable: false,
        default: '',
    })
    tags: string;

    @Column()
    coverImage: string | null

    @OneToMany(() => Comment, comment => comment.article, { eager: true })
    comments: Comment[];

    @Column({
        nullable: false,
        default: 0
    })
    reactions: number;

    @ManyToOne(() => User, user => user.articles)
    user: User;

    @Column()
    userId: number;

    @ManyToMany(() => User, user => user.reading_list)
    listed_users: User[]
}