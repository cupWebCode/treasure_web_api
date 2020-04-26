import { Controller, Post, Get, Body, Headers, Res, HttpStatus, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { PlayerFormDto } from './dto/playerFormDto';
import { PlayerService } from './player.service';
import { ResponseApi } from 'src/common/response-api';
import { ChosenPlayerValues } from './dto/chosenValueDto';
import { ScoreType } from 'src/common/types/score.type';
import { RequestValidatorPipe } from 'src/common/pipes/request-validator.pipe';
import { SchemaPlayerBuilder } from 'src/common/validation/schema-player-builder';

const createPlayerSchema = new SchemaPlayerBuilder().createPlayerValidator<Body>().options({
  abortEarly: false,
  allowUnknown: true
});

const createChosenValuesSchema = new SchemaPlayerBuilder().createChosenValuesValidator<Body>().options({
  abortEarly: false,
  allowUnknown: true
});

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) { }

  @Get()
  async getPlayer(@Headers() headers: Partial<PlayerFormDto>, @Res() response: Response) {
    try {
      const player_id = headers.player_id;
      const result = await this.playerService.getPlayer(player_id as string);

      if (result) {
        const player = result;
        return response.json(new ResponseApi<PlayerFormDto>(true, player, null))
          .status(HttpStatus.OK);
      }
      response
        .json({ message: "Player was't found." })
        .status(HttpStatus.NO_CONTENT);

    } catch (e) {
      console.error(e.stack);
    }
  }

  @Get('/score')
  async score(@Res() response: Response) {
    try {
      const result = await this.playerService.getScore();

      if (result) {
        return response.json(new ResponseApi<ScoreType[]>(true, result, null))
          .status(HttpStatus.OK);
      }
      response
        .json({ message: "No score in storage." })
        .status(HttpStatus.NO_CONTENT);

    } catch (e) {
      console.error(e.stack);
    }
  }

  @Post()
  @UsePipes(new RequestValidatorPipe<PlayerFormDto>(createPlayerSchema))
  async createNewPlayer(@Res() response: Response, @Body() userDto: Partial<PlayerFormDto>) {
    try {
      const result = await this.playerService.createNewPlayer(userDto);
      let msg = '';
      let data = {};
      if (result) {
        msg = `User ${result.player_name} was created successfully.`;
        data = result;
      }
      response
        .json(new ResponseApi<PlayerFormDto>(true, data, msg))
        .status(HttpStatus.CREATED);
    } catch (e) {
      console.error(e.stack);
    }
  }

  @Post('/reveal')
  @UsePipes(new RequestValidatorPipe<ChosenPlayerValues>(createChosenValuesSchema))
  async reveal(@Res() response: Response, @Body() payload: ChosenPlayerValues) {
    try {
      const result = await this.playerService.checkChosenValues(payload);
      if (result.status) {
        return response
          .json(new ResponseApi<PlayerFormDto>(result.status, result.data, result.message))
          .status(HttpStatus.CREATED);
      }
      response
        .json(new ResponseApi<any>(result.status, result.data, result.message))
        .status(HttpStatus.NO_CONTENT);
    } catch (e) {
      console.error(e.stack);
    }
  }
}
