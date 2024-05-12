import { Module } from '@nestjs/common';
import { VolunteersModule } from './volunteers/volunteers.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {dataSourceOptions} from "./database/data-source";
import {JwtModule} from "@nestjs/jwt";
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import {Volunteer} from "./volunteers/volunteers.entity";
import {Feedback} from "./feedbacks/feedbacks.entity";
import {Announcement} from "./announcements/announcements.entity";
import {Token} from "./tokens/tokens.entity";
import { FilesModule } from './files/files.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
      TypeOrmModule.forRoot(dataSourceOptions),
      VolunteersModule,
      AnnouncementsModule,
      AuthModule,
      TokensModule,
      FeedbacksModule,
      FilesModule
  ],
  exports: [
      TypeOrmModule
  ]
})
export class AppModule {}
