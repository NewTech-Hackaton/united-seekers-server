import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Volunteer} from "./volunteers.entity";

@Injectable()
export class VolunteersService {

    constructor(@InjectRepository(Volunteer)
                private readonly volunteersService: VolunteersService) {
    }


}
