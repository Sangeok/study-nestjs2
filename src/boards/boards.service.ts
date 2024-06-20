import { BoardRepository } from './board.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entitiy';

@Injectable()
export class BoardsService {
    constructor(
        private readonly BoardRepository: BoardRepository
    ){}

    async getBoardById(id: number): Promise <Board> {
        return this.BoardRepository.getBoardById(id);
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.BoardRepository.createBoard(createBoardDto);
    }

    async deleteBoard(id: number): Promise<void> {
        return this.BoardRepository.deleteBoard(id);
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        return this.BoardRepository.updateBoardStatus(id, status);
    }

    async getAllBoards(): Promise<Board[]> {
        return this.BoardRepository.getAllBoards();
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
