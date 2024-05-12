import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Req, UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {AnnouncementsService} from "./announcements.service";
import {Request} from "express";
import {CreateAnnouncementDto} from "./dto/create-announcement.dto";
import {AuthGuard} from "../auth/auth.guard";
import {Announcement} from "./announcements.entity";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('announcements')
export class AnnouncementsController {

    constructor(private readonly announcementsService: AnnouncementsService) {
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor("image"))
    @Post("/create-announcement")
    async createAnnouncement(@Req() request,
                             @Body() createAnnouncementDto: CreateAnnouncementDto,
                             @UploadedFile() image)
    {
        try {
            const volunteerId = request.user.id
            return this.announcementsService.createAnnouncement(volunteerId, createAnnouncementDto, image)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(AuthGuard)
    @Get("/get-announcements")
    async getAnnouncements() {
        try {
            return this.announcementsService.getAnnouncements()
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(AuthGuard)
    @Get("/by-id/:announcementId")
    async getAnnouncementById(@Param("announcementId") announcementId: string) {
        try {
           return this.announcementsService.getAnnouncementById(announcementId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(AuthGuard)
    @Get("/by-name/:announcementName")
    async getAnnouncementByName(@Param("announcementName") announcementName: string) {
        try {
            return this.announcementsService.filterAnnouncementsByName(announcementName)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(AuthGuard)
    @Get("/by-location/:location")
    async getAnnouncementByLocation(@Param("location") location: string): Promise<Announcement | Announcement[]> {
        try {
            return this.announcementsService.filterAnnouncementsByLocation(location)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @UseGuards(AuthGuard)
    @Delete("/delete-announcement")
    async deleteAnnouncement(@Req() request,
                             @Param("announcementId") announcementId: string)
    {
        try {
            const volunteerId = request.user.id
            return this.announcementsService.deleteAnnouncement(volunteerId, announcementId)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
