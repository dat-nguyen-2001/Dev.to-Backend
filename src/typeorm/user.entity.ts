import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany ,BaseEntity, JoinTable } from 'typeorm';
import { Article } from './article.entity';
import { Comment } from './comment.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id',
    })
    id: number;

    @Column({
        nullable: false,
    })
    username: string;

    @Column({
        name: 'email_address',
        nullable: false,
    })
    email: string;

    @Column({
        nullable: false,
    })
    password: string;

    @Column({
        nullable: false,
    })
    salt: string

    @Column({})
    profile_pic: string

    @ManyToMany(() => Article, article => article.listed_users, {cascade: true})
    @JoinTable({name: "reading_list"})
    reading_list: Article[];

    @OneToMany(() => Article, article => article.user, {eager: true})
    articles: Article[];

    @OneToMany(() => Comment, comment => comment.user, {eager: true})
    comments: Comment[];
}