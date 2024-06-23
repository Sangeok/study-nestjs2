import { BoardRepository } from './board.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entitiy';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Injectable()
export class BoardsService {
    constructor(
        private readonly BoardRepository: BoardRepository
    ){}

    async getBoardById(id: number): Promise <Board> {
        return this.BoardRepository.getBoardById(id);
    }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.BoardRepository.createBoard(createBoardDto, user);
    }

    async deleteBoard(id: number, user: User): Promise<void> {
        return this.BoardRepository.deleteBoard(id,user);
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        return this.BoardRepository.updateBoardStatus(id, status);
    }

    async getAllBoards(
        @GetUser() user: User
    ): Promise<Board[]> {
        return this.BoardRepository.getAllBoards(user);
    }



    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    // createBoard(createBoardDto: CreateBoardDto): Board {
    //     const { title, description } = createBoardDto;
        
    //     const board: Board = {
    //         id : uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC,
    //     }

    //     this.boards.push(board);
    //     return board;
    // }

    // getBoardById(id: string): Board {
    //     const board = this.boards.find((board) => board.id === id);

    //     if(!board) {
    //         throw new NotFoundException(`Board with ID "${id}" not found`);
    //     }

    //     return board;
    // }

    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }

}
