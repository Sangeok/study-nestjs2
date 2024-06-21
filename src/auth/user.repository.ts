import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository {
    #UserRepositorys: Repository<User>;

    constructor(private readonly dataSource: DataSource) {
        this.#UserRepositorys = this.dataSource.getRepository(User);
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.#UserRepositorys.create({
            username,
            password: hashedPassword,
        });

        try {
            await this.#UserRepositorys.save(user);
        } catch(error) {
            if(error.code === '23505') {
                throw new ConflictException('Username already exists');
            }
            else {
                throw new InternalServerErrorException();
            }
        }  
    }

    async findById(username: string): Promise<User> {
        const user = await this.#UserRepositorys.findOneBy({ username });

        if(!user) {
            throw new ConflictException('User not found');
        }

        return user;
    }
}
