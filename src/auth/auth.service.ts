import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { user } from "./user.schema";
import { Model } from "mongoose";
import * as bcrypt from 'bcryptjs'
import { JwtService } from "@nestjs/jwt";
import { signUpDTO } from "./dto/signup.dto";
import { logInDTO } from "./dto/login.dtp";


@Injectable()

export class authService{
    constructor(
        @InjectModel(user.name)
        private userModel: Model<user>,
        private jwtService: JwtService
    ){}

    async signup(signUpDTO: signUpDTO): Promise<{token : string}>{
        const {name, email, password, favBook} = signUpDTO

        const hashedpPassword = await bcrypt.hash(password,12)

        const newUser = await this.userModel.create({
            name,favBook,email,password: hashedpPassword
        });

        const token = this.jwtService.sign({id: newUser._id })

        return {token}
    }

    async login(
        logInDTO : logInDTO
    ): Promise<{token:string}> {
        const { email, password} = logInDTO;
        const user = await this.userModel.findOne({email: email});
        if(!user){
            throw new UnauthorizedException('Invalid Email address or password')
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if(!isPasswordMatched){
            throw new UnauthorizedException('Invalid Email address or password')
        }

        const token = this.jwtService.sign({id: user._id })

        return {token}
    }

    async resetPassword(email: string, favBook: string, newPassword: string): Promise<string> {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        if (user.favBook !== favBook) {
            throw new UnauthorizedException('Favorite book does not match');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await this.userModel.updateOne({ email }, { password: hashedPassword });

        return 'Password updated successfully';
    }
}