import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {TokensModule} from "../tokens/tokens.module";
import {VolunteersModule} from "../volunteers/volunteers.module";
import * as dotenv from "dotenv"
dotenv.config()
import * as process from "process"

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
      forwardRef(() => TokensModule),
      forwardRef(() => VolunteersModule),
      JwtModule.register({
          secret: "secret",
          signOptions: {
              expiresIn: "336h"
          }
      })
  ],
  exports: [
      AuthService
  ]
})
export class AuthModule {}
