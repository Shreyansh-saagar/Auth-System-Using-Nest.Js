import { Body, Controller, Post, Put, UnauthorizedException } from "@nestjs/common";
import { authService } from "./auth.service";
import { signUpDTO } from "./dto/signup.dto";
import { logInDTO } from "./dto/login.dtp";

@Controller('auth')

export class authController{
    constructor(private authService: authService){}

    @Post('/signup')
    signup(
        @Body() 
        signUpDTO : signUpDTO
    ): Promise<{token:string}> {
        return this.authService.signup(signUpDTO);
    }

    @Post('/signin')
    signin(
        @Body() 
        logInDTO : logInDTO
    ): Promise<{token:string}> {
        return this.authService.login(logInDTO);
    }

    @Put('reset-password')
    async resetPassword(
        @Body('email') email: string,
        @Body('favBook') favBook: string,
        @Body('newPassword') newPassword: string
    ): Promise<{ message: string }> {
        try {
            await this.authService.resetPassword(email, favBook, newPassword);
            return { message: 'Password updated successfully' };
        } catch (error) {
            throw new UnauthorizedException('Password reset failed');
        }
    }
}