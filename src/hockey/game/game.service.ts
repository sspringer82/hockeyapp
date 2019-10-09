import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { Repository } from 'typeorm';
import { Team } from '../team/team.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(Team)
    private readonly TeamRepository: Repository<Team>,
  ) {}

  getAll() {
    return this.gameRepository.find({ relations: ['team1', 'team2'] });
  }

  getOne(date: number, team1: Team, team2: Team) {
    return this.gameRepository.find({ date, team1, team2 });
  }

  edit(id: number, game: Game) {
    return this.gameRepository.save(game);
  }

  async create(game: Game) {
    const newGame = {
      ...game,
      team1: await this.TeamRepository.findOne({ where: { name: game.team1 } }),
      team2: await this.TeamRepository.findOne({ where: { name: game.team2 } }),
    };
    return this.gameRepository.save(newGame);
  }

  async remove(date: number, team1: Team, team2: Team) {
    return this.gameRepository.remove(await this.getOne(date, team1, team2));
  }
}
