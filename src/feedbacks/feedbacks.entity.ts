import {
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Announcement} from "../announcements/announcements.entity";
import {Volunteer} from "../volunteers/volunteers.entity";


@Entity()
export class Feedback {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "varchar", nullable: true})
    content: string;

    @Column({type: "varchar", nullable: true})
    imageUrl: string;

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updatedAt: Date;

    @ManyToOne(() => Announcement, announcement => announcement.feedbacks)
    @JoinTable()
    announcement: Announcement;

    @ManyToOne(() => Volunteer, volunteer => volunteer.feedbacks)
    @JoinTable()
    author: Volunteer


}