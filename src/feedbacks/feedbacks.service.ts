import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Feedback} from "./feedbacks.entity";
import {Repository} from "typeorm";
import {CreateFeedbackDto} from "./dto/create-feedback.dto";
import {AnnouncementsService} from "../announcements/announcements.service";
import {FilesService} from "../files/files.service";
import {VolunteersService} from "../volunteers/volunteers.service";

@Injectable()
export class FeedbacksService {

    constructor(@InjectRepository(Feedback)
                private readonly feedbackRepository: Repository<Feedback>,
                private readonly announcementsService: AnnouncementsService,
                private readonly filesService: FilesService,
                private readonly volunteersService: VolunteersService) {
    }

    async createFeedback(volunteerId: string, announcementId: string, createFeedbackDto: CreateFeedbackDto, image: any) {
        const volunteer = await this.volunteersService.findVolunteerById(volunteerId)
        const filename = await this.filesService.createFile(image)
        const announcement = await this.announcementsService.getAnnouncementById(announcementId)

        if (!announcement) {
            throw new NotFoundException("announcement was not found")
        }

        const feedback = this.feedbackRepository.create(createFeedbackDto)
        feedback.announcement = announcement
        feedback.author = volunteer

        return await this.feedbackRepository.save(feedback)
    }

    async getFeedbacks(announcementId: string) {
        const volunteer = await this.volunteersService.findVolunteerById(announcementId)
        return await this.feedbackRepository.find({
            where: {author: volunteer},
            relations: ["author"]
        })
    }

}
