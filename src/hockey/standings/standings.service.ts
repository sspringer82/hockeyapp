import { Injectable } from '@nestjs/common';
import { GameService } from '../game/game.service';

@Injectable()
export class StandingsService {
  constructor(private gameService: GameService) {}
  async getStandings() {
    const games = await this.gameService.getAll();
    let standings = {};
    games.forEach(game => {
      standings = this.initializeTeam(standings, game.team1);
      standings = this.initializeTeam(standings, game.team2);
      standings = this.setStats(
        standings,
        game.team1,
        game.score1,
        game.score2,
      );
      standings = this.setStats(
        standings,
        game.team2,
        game.score2,
        game.score1,
      );
      if (game.score1 > game.score2) {
        standings[game.team1.id].pts += 3;
      } else {
        standings[game.team1.id].pts += 3;
      }
    });
    return Object.values(standings);
  }

  private initializeTeam(standings, team) {
    standings[team.id] = standings[team.id]
      ? standings[team.id]
      : {
          name: team.name,
          logo: team.logo,
          pts: 0,
          diffP: 0,
          diffM: 0,
          gp: 1,
        };
    return standings;
  }

  private setStats(standings, team, scoreP, scoreM) {
    standings[team.id].gp++;
    standings[team.id].diffP += parseInt(scoreP, 10);
    standings[team.id].diffM += parseInt(scoreM, 10);
    return standings;
  }
}
