import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Announcement} from "../announcements/announcements.entity";
import {Token} from "../tokens/tokens.entity";


@Entity()
export class Volunteer {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "varchar", nullable: false})
    firstname: string;

    @Column({type: "varchar", nullable: true})
    lastname: string;

    @Column({type: "varchar", nullable: false})
    email: string;

    @Column({type: "varchar", nullable: false})
    phoneNumber: string;

    @Column({type: "boolean", default: false})
    isVerified: boolean;

    @Column({type: "boolean", default: false})
    canAddAnnouncements: boolean;

    @OneToMany(() => Announcement, announcements => announcements.author)
    announcements: Announcement[]

    @OneToOne(() => Token, token => token.owner)
    token: Token

}