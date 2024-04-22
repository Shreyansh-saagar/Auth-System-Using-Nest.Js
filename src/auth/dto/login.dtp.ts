import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class logInDTO{
    @IsNotEmpty()
    @IsEmail({},{message: 'Please enter a valid email address'})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    readonly password: string;
}