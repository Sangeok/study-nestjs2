import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from "./board.entitiy";
import { BoardStatus } from './board-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BoardRepository {
    #boardsRepository: Repository<Board>;
    
    constructor(private readonly dataSource: DataSource) {
        this.#boardsRepository = this.dataSource.getRepository(Board);
    }

    createBoard(CreateBoardDto: CreateBoardDto): Promise<Board> {
        const { title, description } = CreateBoardDto;
        console.log("createBoard");

        const board = this.#boardsRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
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

    async deleteBoard(id: number) : Promise<void> {
        const result = await this.#boardsRepository.delete({ id });
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.#boardsRepository.save(board);
        console.log(board);
        return board;
    }

    getAllBoards(): Promise<Board[]> {
        return this.#boardsRepository.find();
    }
}
