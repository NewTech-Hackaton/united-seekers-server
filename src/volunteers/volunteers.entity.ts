import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Announcement} from "../announcements/announcements.entity";
import {Token} from "../tokens/tokens.entity";
import {Feedback} from "../feedbacks/feedbacks.entity";


@Entity()
export class Volunteer {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "varchar", nullable: false})
    name: string;

    @Column({type: "varchar", nullable: false, unique: true})
    email: string;

    @Column({type: "varchar", nullable: false})
    password: string;

    @Column({type: "boolean", default: true})
    isVerified: boolean;

    @Column({type: "boolean", default: false})
    canAddAnnouncements: boolean;

    @OneToMany(() => Announcement, announcements => announcements.author)
    announcements: Announcement[]

    @OneToOne(() => Token, token => token.owner)
    token: Token

    @OneToMany(() => Feedback, feedbacks => feedbacks.author)
    feedbacks: Feedback[]

}