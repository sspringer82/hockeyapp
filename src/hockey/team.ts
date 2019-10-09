import { ApiModelProperty } from '@nestjs/swagger';

export class Team {
  @ApiModelProperty({ example: 1 })
  public id?: number;
  @ApiModelProperty({ example: 'Red Bull München' })
  public name: string;
  @ApiModelProperty({ example: 'FILE' })
  public logo: string;
}
