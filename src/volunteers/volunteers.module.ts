import { Module } from '@nestjs/common';
import { VolunteersService } from './volunteers.service';
import { VolunteersController } from './volunteers.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Volunteer} from "./volunteers.entity";

@Module({
  providers: [VolunteersService],
  controllers: [VolunteersController],
  imports: [
      TypeOrmModule.forFeature([Volunteer])
  ],
  exports: [
      VolunteersService,
      TypeOrmModule
  ]
})
export class VolunteersModule {}
