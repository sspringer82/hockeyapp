import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Team } from '../team/team.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  date: number;

  @OneToOne(type => Team)
  @JoinColumn()
  team1: Team;

  @Column('text')
  score1: number;

  @OneToOne(type => Team)
  @JoinColumn()
  team2: Team;

  @Column('text')
  score2: number;
}
