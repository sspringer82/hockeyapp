import { Module } from '@nestjs/common';
import { TeamController } from './team/team.controller';
import { GameController } from './game/game.controller';
import { StandingsController } from './standings/standings.controller';
import { TeamService } from './team/team.service';
import { GameService } from './game/game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team/team.entity';
import { Game } from './game/game.entity';
import { StandingsService } from './standings/standings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Game])],
  controllers: [TeamController, GameController, StandingsController],
  providers: [TeamService, GameService, StandingsService],
})
export class HockeyModule {}
