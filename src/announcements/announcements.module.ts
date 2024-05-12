import {forwardRef, Module} from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import {VolunteersModule} from "../volunteers/volunteers.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Announcement} from "./announcements.entity";
import {JwtModule} from "@nestjs/jwt";
import {FilesService} from "../files/files.service";
import {FilesModule} from "../files/files.module";
import {FeedbacksModule} from "../feedbacks/feedbacks.module";
import {Feedback} from "../feedbacks/feedbacks.entity";

@Module({
  providers: [AnnouncementsService],
  controllers: [AnnouncementsController],
  imports: [
      forwardRef(() => VolunteersModule),
      TypeOrmModule.forFeature([Announcement]),
      forwardRef(() => JwtModule),
      forwardRef(() => FilesModule),
      forwardRef(() => FeedbacksModule)
  ],
  exports: [
      AnnouncementsService,
      TypeOrmModule
  ]
})
export class AnnouncementsModule {}
