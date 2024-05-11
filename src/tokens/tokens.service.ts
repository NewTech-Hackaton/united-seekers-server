import { Injectable } from '@nestjs/common';
import {VolunteersService} from "../volunteers/volunteers.service";
import {JwtService} from "@nestjs/jwt";
import {AST} from "eslint";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Token} from "./tokens.entity";
import {Volunteer} from "../volunteers/volunteers.entity";

@Injectable()
export class TokensService {

    constructor(@InjectRepository(Token)
                private readonly tokenRepository: Repository<Token>,
                private readonly jwtService: JwtService) {
    }

    async generateToken(volunteerData?: Volunteer): Promise<Token> {
        const payload = {
            id: volunteerData.id,
            username: volunteerData.name,
            email: volunteerData.email,
            password: volunteerData.password
        }

        const tokenValue = this.jwtService.sign(payload, { secret: "secret" })
        const token = this.tokenRepository.create({tokenValue: tokenValue})
        return await this.tokenRepository.save(token)
    }

    async updateToken(volunteerData?: Volunteer) {
        const token = await this.tokenRepository.findOne({
            where: {owner: volunteerData}
        })

        if (token) {
            const payload = {
                id: volunteerData.id,
                username: volunteerData.name,
                email: volunteerData.email,
                password: volunteerData.password
            }

            token.tokenValue = this.jwtService.sign(payload, { secret: "secret" })
            console.log(token)
            return await this.tokenRepository.save(token)
        }
    }

    async saveToken(token: Token): Promise<Token> {
        return await this.tokenRepository.save(token)
    }

    async findToken(volunteerData: Volunteer): Promise<Token> {

        return await this.tokenRepository.findOne({
            where: {owner: volunteerData}
        })

    }

    async deleteToken(token: Token): Promise<Token> {

        return await this.tokenRepository.remove(token)
    }

}
