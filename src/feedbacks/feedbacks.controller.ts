import {
    Body,
    Controller, Get,
    HttpException, HttpStatus,
    Param,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {FeedbacksService} from "./feedbacks.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {AuthGuard} from "../auth/auth.guard";
import {CreateFeedbackDto} from "./dto/create-feedback.dto";

@Controller('feedbacks')
export class FeedbacksController {

    constructor(private readonly feedbacksService: FeedbacksService) {
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor("image"))
    @Post("/create-feedback/:announcementId")
    async createFeedback(@Req() request,
                         @Param("announcementId") announcementId: string,
                         @Body() createFeedbackDto: CreateFeedbackDto,
                         @UploadedFile() image)
    {
        try {
            const volunteerId = request.user.id
            return this.feedbacksService.createFeedback(volunteerId, announcementId, createFeedbackDto, image)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(AuthGuard)
    @Get("/get-feedbacks/:announcementId")
    async getFeedbacks(@Param("announcementId") announcementId: string) {
        try {
            return this.feedbacksService.getFeedbacks(announcementId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
