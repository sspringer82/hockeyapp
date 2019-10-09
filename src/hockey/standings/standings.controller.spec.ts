import { Test, TestingModule } from '@nestjs/testing';
import { StandingsController } from './standings.controller';
import { StandingsService } from './standings.service';
import { GameService } from '../game/game.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Game } from '../game/game.entity';
import { Team } from '../team/team.entity';

describe('Standings Controller', () => {
  let controller: StandingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StandingsController],
      providers: [
        StandingsService,
        GameService,
        { provide: getRepositoryToken(Game), useValue: {} },
        { provide: getRepositoryToken(Team), useValue: {} },
      ],
    }).compile();

    controller = module.get<StandingsController>(StandingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
