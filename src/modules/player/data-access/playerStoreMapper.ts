import { Injectable } from "@nestjs/common";
import { PlayerFormDto } from "../dto/playerFormDto";
import { StorageType } from "src/common/types/storage.type";
import { boardMap as gameData } from "src/common/boardMap";
import { BoardMapType } from "src/common/types/boardMap.type";
import { ScoreType } from "src/common/types/score.type";

@Injectable()
export class PlayerStoreMapper {
  costOneStep: number = 4
  private storage: StorageType = {};//DATABASE simulation
  private boardMap: BoardMapType;

  constructor() { }
  async getPlayer(id: string): Promise<PlayerFormDto> {
    if (id in this.storage) {
      return Promise.resolve(this.storage[id]);
    }
  }

  async getScore(): Promise<Array<ScoreType>> {
    const maxTopScore = 10;
    const data: ScoreType[] = [];
    for (var i in this.storage) {
      data.push({
        player_name: this.storage[i].player_name,
        score: this.storage[i].score
      });
    }
    const dataSorted = data.sort((a, b) => {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return -1;
    })
    return Promise.resolve(dataSorted.slice(0, maxTopScore));
  }

  async createNewPlayer(payload: Partial<PlayerFormDto>): Promise<PlayerFormDto> {
    const player_name = payload.player_name;
    const player_id = payload.player_id;
    this.setNewDataMap();
    let data = {};
    if (!(player_id in this.storage)) {
      data = {
        player_name,
        score: 100,
        player_id: player_id,
        chosenSquares: [],
        revealedTreasure: 0,
        isGameContinue: true
      };
      this.storage[player_id] = data;
    }

    return Promise.resolve(this.storage[player_id]);
  }

  get getStorage(): StorageType {
    return this.storage;
  }

  get getCostOneStep(): number {
    return this.costOneStep;
  }
  get getboardMap(): BoardMapType {
    return this.boardMap;
  }


  set setStorageItem(data: { id: string, value: any }) {
    if (data.id in this.storage) {
      this.storage[data.id].chosenSquares.push(data.value);
    }
  }

  private setNewDataMap() {
    const mapKey = this.getRandomInt(1, 3);
    this.boardMap = gameData[`map${mapKey}`];
  }

  private getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
