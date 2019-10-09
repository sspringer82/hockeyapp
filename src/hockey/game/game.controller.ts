import { Controller, Post, Body, Get } from '@nestjs/common';
import { Game } from './game.entity';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  getAll() {
    return this.gameService.getAll();
  }

  @Post()
  create(@Body() game: Game) {
    return this.gameService.create(game);
  }
}
