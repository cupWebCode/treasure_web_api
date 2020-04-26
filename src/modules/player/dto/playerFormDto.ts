import { ChosenValueDto } from "./chosenValueDto";

export class PlayerFormDto {
  player_id?: string;
  player_name?: string;
  score?: number;
  chosenSquares?: ChosenValueDto[];
  revealedTreasure?: number;
  isGameContinue?: boolean;
}
