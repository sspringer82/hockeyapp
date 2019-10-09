import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Team } from '../team/team.entity';
import { Game } from './game.entity';

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        { provide: getRepositoryToken(Team), useValue: {} },
        { provide: getRepositoryToken(Game), useValue: {} },
      ],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
