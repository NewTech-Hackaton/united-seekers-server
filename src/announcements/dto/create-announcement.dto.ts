import {Column} from "typeorm";

export class CreateAnnouncementDto {

    readonly title: string;

    readonly description: string;

    readonly loseDate: Date;

    readonly lastSeenLocation: string;

    readonly imageUrl: string;

}