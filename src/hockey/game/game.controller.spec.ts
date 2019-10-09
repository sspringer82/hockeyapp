import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { Team } from '../team/team.entity';

describe('Game Controller', () => {
  let controller: GameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [
        GameService,
        {
          provide: getRepositoryToken(Game),
          useValue: {
            find: jest.fn().mockResolvedValue([
              {
                team1: {
                  id: 1,
                  name: 'Team 1',
                  logo: 'logo1',
                },
                score1: 4,
                team2: { id: 2, name: 'Team 2', logo: 'logo2' },
                score2: 2,
              },
            ]),
          },
        },
        { provide: getRepositoryToken(Team), useValue: {} },
      ],
    }).compile();

    controller = module.get<GameController>(GameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all games', async () => {
    expect(controller.getAll()).resolves.toEqual([
      {
        score1: 4,
        score2: 2,
        team1: { id: 1, logo: 'logo1', name: 'Team 1' },
        team2: { id: 2, logo: 'logo2', name: 'Team 2' },
      },
    ]);
  });
});
