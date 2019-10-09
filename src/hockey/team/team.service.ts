import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  getAll() {
    return this.teamRepository.find();
  }

  getOne(id: number) {
    return this.teamRepository.findOne({ id });
  }

  edit(id: number, team: Team) {
    return this.teamRepository.save(team);
  }

  create(team: Team) {
    return this.teamRepository.save(team);
  }

  async remove(id: number) {
    return this.teamRepository.remove(await this.getOne(id));
  }
}
