import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { BoardsService } from './boards.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entitiy';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
@UseGuards(AuthGuard())
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
    getAllBoards(
        @GetUser() user: User
    ): Promise<Board[]> {
        return this.boardService.getAllBoards(user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User
    ): Promise<Board> {
        return this.boardService.createBoard(createBoardDto, user);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(
        @Param('id') id: number,
        @GetUser() user: User
    ): Promise<void> {
        return this.boardService.deleteBoard(id, user);
    }

    @Patch('/:id/status')
    updateBoardStatus(@Param('id') id: number, @Body('status', BoardStatusValidationPipe) status: BoardStatus): Promise<Board> {
        console.log()
        return this.boardService.updateBoardStatus(id, status);
    }
  
}
