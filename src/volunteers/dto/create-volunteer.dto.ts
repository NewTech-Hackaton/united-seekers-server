import {IsEmail, IsNotEmpty} from "@nestjs/class-validator";

export class CreateVolunteerDto {

    @IsNotEmpty({message: "Ініціали обов'язкові"})
    readonly name: string;

    @IsNotEmpty({message: "Емейл обов'язковий"})
    @IsEmail({}, {message: "Емейл обов'язковий"})
    readonly email: string;

    @IsNotEmpty({message: "Пароль обов'язковий"})
    readonly password: string;

}