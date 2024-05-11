import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Announcement} from "../announcements/announcements.entity";


@Entity()
export class Feedback {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "varchar", nullable: true})
    content: string;

    @Column({type: "varchar", nullable: true})
    imageUrl: string;

    @OneToMany(() => Announcement, announcement => announcement.feedbacks)
    announcement: Announcement;

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updatedAt: Date;

}