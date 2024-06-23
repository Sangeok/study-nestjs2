import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from "./board.entitiy";
import { BoardStatus } from './board-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardRepository {
    #boardsRepository: Repository<Board>;
    
    constructor(private readonly dataSource: DataSource) {
        this.#boardsRepository = this.dataSource.getRepository(Board);
    }

    createBoard(CreateBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const { title, description } = CreateBoardDto;
        console.log("title: ", title);
        console.log("createBoard");

        const board = this.#boardsRepository.create({
            title: title,
            description: description,
            status: BoardStatus.PUBLIC,
            user: user
        });
        console.log(board);

        return this.#boardsRepository.save(board);
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.#boardsRepository.findOneBy({ id });

        if (!found) {
            throw new NotFoundException(`Board with ID "${id}" not found`);
        }

        return found;
    }

    async deleteBoard(id: number, user: User) : Promise<void> {
        const result = await this.#boardsRepository.delete({ id, user });
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.#boardsRepository.save(board);
        console.log(board);
        return board;
    }

    async getAllBoards(user: User): Promise<Board[]> {
        const query = this.#boardsRepository.createQueryBuilder('board');
        query.where('board.userId = :userId', { userId: user.id });

        const board = await query.getMany();
        return board;
    }
}
