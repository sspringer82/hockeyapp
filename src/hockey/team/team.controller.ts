import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Body,
  Logger,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { Team } from './team.entity';
import { TeamService } from './team.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Get()
  @ApiOkResponse({ description: 'Get all teams', type: Team, isArray: true })
  @UseGuards(AuthGuard('jwt'))
  getAll(): Promise<Team[]> {
    Logger.debug('Getting all Teams');
    return this.teamService.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: 'Get one team', type: Team, isArray: false })
  getOne(@Param('id') id: string) {
    return this.teamService.getOne(parseInt(id, 10));
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './logos',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill('')
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @ApiOkResponse({ description: 'Modify a team', type: Team, isArray: false })
  edit(@Param('id') id: string, @Body() team: Team, @UploadedFile() file) {
    const editTeam = {
      ...team,
    };
    if (file) {
      editTeam.logo = file.filename;
    }
    return this.teamService.edit(parseInt(id, 10), editTeam);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: 'Create a team', type: Team, isArray: false })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './logos',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill('')
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(@Body() team: Team, @UploadedFile() file) {
    const newTeam = {
      ...team,
      logo: file.filename,
    };
    return this.teamService.create(newTeam);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: 'Delete a team' })
  remove(@Param('id') id: string) {
    this.teamService.remove(parseInt(id, 10));
  }
}
