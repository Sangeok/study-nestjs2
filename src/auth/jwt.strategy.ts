import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly UserRepository: UserRepository){
        super({
            secretOrKey: 'Secret1234',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {
        const { username } = payload;
        const user = await this.UserRepository.findById(username);

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}