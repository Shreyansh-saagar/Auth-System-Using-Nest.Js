import { Module } from "@nestjs/common";
import { userSchema } from "./user.schema";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { authController } from "./auth.controller";
import { authService } from "./auth.service";

@Module({
    imports:[
        PassportModule.register({defaultStrategy:'jwt'}),
        JwtModule.registerAsync({
            inject:[ConfigService],
            useFactory:(config: ConfigService)=> {
                return {
                    secret:config.get<string>('JWT_SECRET'),
                    signOptions:{
                        expiresIn: config.get<string | number>('JWT_EXPIRE')
                    }
                }
            }
        }),
        MongooseModule.forFeature([{
        name:"user",
        schema:userSchema
        }])
    ],
    controllers:[authController],
    providers:[authService],
})

export class authModule{
    
}