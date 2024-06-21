import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './boards/board.entitiy';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

@Module({
  imports: [
    BoardsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 8000,
      username: 'postgres',
      password: 'tlsrlf12!',
      database: 'board-app',
      entities: [Board, User],
      synchronize: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
