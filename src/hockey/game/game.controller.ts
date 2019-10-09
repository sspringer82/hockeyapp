import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Game } from './game.entity';
import { GameService } from './game.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll() {
    return this.gameService.getAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() game: Game) {
    return this.gameService.create(game);
  }

  @Put('/id')
  @UseGuards(AuthGuard('jwt'))
  edit(@Param('id') id: string, @Body() game: Game) {
    return this.gameService.edit(parseInt(id, 10), game);
  }

  @Delete('/:date/:team1/:team2')
  @UseGuards(AuthGuard('jwt'))
  remove(
    @Param('date') date: string,
    @Param('team1') team1: string,
    @Param('team2') team2: string,
  ) {
    this.gameService.remove(
      parseInt(date, 10),
      parseInt(team1, 10),
      parseInt(team2, 10),
    );
  }
}
