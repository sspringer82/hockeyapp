import { Test, TestingModule } from '@nestjs/testing';
import { StandingsService } from './standings.service';
import { GameService } from '../game/game.service';

describe('StandingsService', () => {
  let service: StandingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StandingsService,
        {
          provide: GameService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([
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
      ],
    }).compile();

    service = module.get<StandingsService>(StandingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should resolve the correct standings', async () => {
    const result = await service.getStandings();
    expect(result).toEqual([
      { name: 'Team 1', diffM: 2, diffP: 4, gp: 2, logo: 'logo1', pts: 3 },
      { name: 'Team 2', diffM: 4, diffP: 2, gp: 2, logo: 'logo2', pts: 0 },
    ]);
  });
});
