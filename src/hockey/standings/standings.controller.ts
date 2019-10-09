import { Controller, Get, Render } from '@nestjs/common';
import { StandingsService } from './standings.service';

@Controller('standings')
export class StandingsController {
  constructor(private standingsService: StandingsService) {}

  @Get()
  @Render('standings/index.ejs')
  async getStandings() {
    return { standings: await this.standingsService.getStandings() };
  }
}
