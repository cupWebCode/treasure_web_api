import { Injectable } from '@nestjs/common';
import { PlayerFormDto } from './dto/playerFormDto';
import { PlayerStoreMapper } from './data-access/playerStoreMapper';
import { ChosenPlayerValues } from './dto/chosenValueDto';
import { ScoreType } from 'src/common/types/score.type';

@Injectable()
export class PlayerService {
  constructor(private dataMapper: PlayerStoreMapper) { }

  async getPlayer(id: string): Promise<PlayerFormDto> {
    return await this.dataMapper.getPlayer(id);
  }

  async createNewPlayer(payload: Partial<PlayerFormDto>): Promise<PlayerFormDto> {
    return await this.dataMapper.createNewPlayer(payload);
  }

  async getScore(): Promise<Array<ScoreType>> {
    return await this.dataMapper.getScore();
  }

  async checkChosenValues(payload: ChosenPlayerValues): Promise<{ status: boolean, data: any, message: string }> {
    const storage = this.dataMapper.getStorage;
    const boardMap = this.dataMapper.getboardMap;
    let isGameContinue = true;
    let message = '';

    if (!(payload.player_id in storage)) {
      message = 'No player in storage';
      return Promise.resolve({ status: false, data: {}, message });
    }

    payload.chosenValues.forEach(position => {
      const isPositionInMap = position in boardMap.data;
      const isPlayerCreated = payload.player_id in storage;
      if (isPositionInMap && isPlayerCreated) {

        isGameContinue = this.checkIsTreasureFound(position, payload.player_id);

        const res = {
          position,
          val: boardMap.data[position].val
        };

        this.dataMapper.setStorageItem = {
          id: payload.player_id,
          value: res
        };
      }
    });

    if (!isGameContinue) {
      message = 'You have found all treasure. Congratulations. Game over.';
    }
    const data = storage[payload.player_id];

    return Promise.resolve({ status: isGameContinue, data, message });
  }

  private checkIsTreasureFound(position: string, player_id: string): boolean {
    const storage = this.dataMapper.getStorage;
    const boardMap = this.dataMapper.getboardMap;
    let isGameContinue = true;

    storage[player_id].score -= this.dataMapper.getCostOneStep;
    if (boardMap.data[position].val === 'T') {
      storage[player_id].revealedTreasure += 1;
    }
    if (storage[player_id].revealedTreasure === boardMap.treasureAmount) {
      isGameContinue = storage[player_id].isGameContinue = false;
    }
    return isGameContinue;
  }
}
