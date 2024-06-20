import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { BoardsService } from './boards.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entitiy';

@Controller('boards')
export class BoardsController {
    constructor(private boardService: BoardsService) {}

    // handler
    // @Get()
    // getAllBoard(): Board[] {
    //   return this.boardService.getAllBoards();
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    //   return this.boardService.createBoard(createBoardDto);
    // }

    @Get()
    getAllBoards(): Promise<Board[]> {
        return this.boardService.getAllBoards();
    }

    @Post()
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: number): Promise<void> {
        return this.boardService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(@Param('id') id: number, @Body('status', BoardStatusValidationPipe) status: BoardStatus): Promise<Board> {
        console.log()
        return this.boardService.updateBoardStatus(id, status);
    }

    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board {
    //   return this.boardService.getBoardById(id);
    // }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //   return this.boardService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(@Param('id') id: string, @Body('status', BoardStatusValidationPipe) status: BoardStatus) {
    //   return this.boardService.updateBoardStatus(id, status);
    // }
  
}
