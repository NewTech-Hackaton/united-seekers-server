import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Announcement} from "./announcements.entity";
import {Repository} from "typeorm";
import {CreateAnnouncementDto} from "./dto/create-announcement.dto";
import {VolunteersService} from "../volunteers/volunteers.service";
import {FilesService} from "../files/files.service";

@Injectable()
export class AnnouncementsService {

    constructor(@InjectRepository(Announcement)
                private readonly announcementRepository: Repository<Announcement>,
                private readonly volunteersService: VolunteersService,
                private readonly filesService: FilesService) {
    }

    async createAnnouncement(volunteerId: string, createAnnouncementDto: CreateAnnouncementDto, image: any) {
        const filename = await this.filesService.createFile(image)
        const announcement = this.announcementRepository.create({
            ...createAnnouncementDto, imageUrl: filename
        })
        const volunteer = await this.volunteersService.findVolunteerById(volunteerId)

        if (!volunteer) {
            throw new NotFoundException("user was not found")
        }

        announcement.author = volunteer

        return await this.announcementRepository.save(announcement)
    }

    async deleteAnnouncement(volunteerId: string, announcementId: string) {
        const volunteer = await this.volunteersService.findVolunteerById(volunteerId)
        const announcement = await this.announcementRepository.findOne({
            where: {author: volunteer}
        })

        return this.announcementRepository.remove(announcement)

    }

    async getAnnouncements(): Promise<Announcement[]> {
        return await this.announcementRepository.find()
    }

    async getAnnouncementById(announcementId: string) {
        return await this.announcementRepository.findOne({
            where: {id: announcementId}
        })
    }

    async filterAnnouncementsByName(announcementName: string) {
        return await this.announcementRepository.find({
            where: {title: announcementName}
        })
    }

    async filterAnnouncementsByLocation(announcementLocation: string) {
        return await this.announcementRepository.find({
            where: {lastSeenLocation: announcementLocation}
        })
    }

    async setFoundPerson(volunteerId: string, announcementId: string) {
        const volunteer = await this.volunteersService.findVolunteerById(volunteerId)
        const announcement = await this.announcementRepository.findOne({
            where: {id: announcementId, author: volunteer}
        })

        announcement.found = true

        return await this.announcementRepository.save(announcement)
    }

}
