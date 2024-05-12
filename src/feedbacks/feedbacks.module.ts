import {forwardRef, Module} from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Feedback} from "./feedbacks.entity";
import {AnnouncementsModule} from "../announcements/announcements.module";
import {FilesModule} from "../files/files.module";
import {VolunteersModule} from "../volunteers/volunteers.module";
import {JwtModule} from "@nestjs/jwt";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [FeedbacksService],
  controllers: [FeedbacksController],
  imports: [
      TypeOrmModule.forFeature([Feedback]),
      forwardRef(() => AnnouncementsModule),
      forwardRef(() => FilesModule),
      forwardRef(() => VolunteersModule),
      forwardRef(() => AuthModule),
      JwtModule
  ],
  exports: [
      TypeOrmModule,
      FeedbacksService
  ]
})
export class FeedbacksModule {}
