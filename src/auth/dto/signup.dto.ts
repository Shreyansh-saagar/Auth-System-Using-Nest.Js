import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class signUpDTO{
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsString()
    readonly favBook: string;

    @IsNotEmpty()
    @IsEmail({},{message: 'Please enter a valid email address'})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    readonly password: string;
}