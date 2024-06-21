import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly UserRepository: UserRepository,
        private jswService: JwtService
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.UserRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const {username, password} = authCredentialsDto;
        const user = await this.UserRepository.findById(username);

        if(user && (await bcrypt.compare(password, user.password))) {
            // 유저 토큰 생성( Secret + PayLoad )
            const payload = {username};
            const accessToken = await this.jswService.sign(payload)

            return {accessToken}
        }
        else {
            throw new UnauthorizedException('login failed')
        }
    }
}
