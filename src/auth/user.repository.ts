import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserRepository {
       #UserRepositorys: Repository<User>;

       constructor(private readonly dataSource: DataSource) {
        this.#UserRepositorys = this.dataSource.getRepository(User);
    }
}
