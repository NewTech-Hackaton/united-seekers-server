import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Volunteer} from "../volunteers/volunteers.entity";


@Entity()
export class Token {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "varchar", nullable: false})
    tokenValue: string;

    @OneToOne(() => Volunteer, volunteer => volunteer.token)
    @JoinColumn()
    owner: Volunteer

}
