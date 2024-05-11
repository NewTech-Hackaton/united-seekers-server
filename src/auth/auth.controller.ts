import {Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RegistrationDto} from "./dto/registration.dto";
import {LoginDto} from "./dto/login.dto";
import {Volunteer} from "../volunteers/volunteers.entity";
import {Token} from "../tokens/tokens.entity";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post("/registration")
    async registration(@Body() registrationDto: RegistrationDto): Promise<[Token, Volunteer]> {
        try {
            return this.authService.registration(registrationDto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Post("/login")
    async login(@Body() loginDto: LoginDto): Promise<[Token, Volunteer]> {
        try {
            return this.authService.login(loginDto)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
