import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {VolunteersService} from "../volunteers/volunteers.service";
import {RegistrationDto} from "./dto/registration.dto";
import * as bcrypt from "bcrypt"
import {TokensService} from "../tokens/tokens.service";
import {LoginDto} from "./dto/login.dto";
import {Volunteer} from "../volunteers/volunteers.entity";
import {Token} from "../tokens/tokens.entity";

@Injectable()
export class AuthService {

    constructor(private readonly volunteersService: VolunteersService,
                private readonly tokensService: TokensService) {
    }

    UNAUTHORIZED_USER_MESSAGE = "user is not authorized"

    async registration(registrationDto: RegistrationDto): Promise<[Token, Volunteer]> {

        const user = await this.volunteersService.findVolunteerByEmail(registrationDto.email)

        if (user) {
            throw new BadRequestException("user with this email already exists")
        }

        const hashedPassword = await bcrypt.hash(registrationDto.password, 6)
        const registeredVolunteer = await this.volunteersService.createVolunteer({
            ...registrationDto,
            password: hashedPassword
        })

        await this.volunteersService.saveVolunteerToDB(registeredVolunteer)

        const generatedToken = await this.tokensService.generateToken(registeredVolunteer)
        generatedToken.owner = registeredVolunteer

        await this.tokensService.saveToken(generatedToken)

        return [ generatedToken, registeredVolunteer ]

    }

    async validateUser(loginDto: LoginDto): Promise<Volunteer> {
        const volunteer = await this.volunteersService.findVolunteerByEmail(loginDto.email)

        if (!volunteer) {
            throw new BadRequestException("User with that email was not found")
        }

        const comparePassword = await bcrypt.compare(loginDto.password, volunteer.password)
        if (volunteer && comparePassword) {
            return volunteer
        }

        throw new UnauthorizedException({message: this.UNAUTHORIZED_USER_MESSAGE})
    }

    async login(loginDto: LoginDto): Promise<[Token, Volunteer]> {
        const volunteer = await this.validateUser(loginDto)

        const generatedToken = await this.tokensService.updateToken(volunteer)
        return [ generatedToken, volunteer ]
    }

}
