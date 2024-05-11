import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Token} from "./tokens.entity";
import {JwtModule} from "@nestjs/jwt";

@Module({
  providers: [TokensService],
  imports: [
      TypeOrmModule.forFeature([Token]),
      JwtModule
  ],
  exports: [
      TypeOrmModule,
      TokensService
  ]
})
export class TokensModule {}
