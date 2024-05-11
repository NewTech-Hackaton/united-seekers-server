import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Volunteer} from "../volunteers/volunteers.entity";
import {Feedback} from "../feedbacks/feedbacks.entity";


@Entity()
export class Announcement {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "varchar", nullable: false})
    firstName: string;

    @Column({type: "varchar", nullable: false})
    lastName: string;

    @Column({type: "varchar", nullable: false})
    middleName: string;

    @Column({type: Date, nullable: false})
    loseDate: Date;

    @Column({type: "varchar"})
    lastSeenLocation: string;

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updatedAt: Date;

    @ManyToOne(() => Volunteer,volunteer => volunteer.announcements)
    author: Volunteer

    @OneToMany(() => Feedback, feedbacks => feedbacks.announcement)
    feedbacks: Feedback[]

}