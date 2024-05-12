import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Volunteer} from "./volunteers.entity";
import {CreateVolunteerDto} from "./dto/create-volunteer.dto";
import {Repository} from "typeorm";

@Injectable()
export class VolunteersService {

    constructor(@InjectRepository(Volunteer)
                private readonly volunteerRepository: Repository<Volunteer>) {
    }

    async createVolunteer(createVolunteerDto: CreateVolunteerDto): Promise<Volunteer> {
        const volunteer = this.volunteerRepository.create(createVolunteerDto)

        return volunteer
    }

    async saveVolunteerToDB(volunteerData: Volunteer) {
        return await this.volunteerRepository.save(volunteerData)
    }

    async findVolunteerById(id: string): Promise<Volunteer> {
        return await this.volunteerRepository.findOne({
            where: {id: id}
        })
    }

    async findVolunteerByName(name: string): Promise<Volunteer> {
        return await this.volunteerRepository.findOne({
            where: {name: name}
        })
    }


    async findVolunteerByEmail(email: string): Promise<Volunteer> {
        return await this.volunteerRepository.findOne({
            where: {email: email}
        })
    }

}
