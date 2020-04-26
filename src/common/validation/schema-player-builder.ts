import { ObjectSchema } from '@hapi/joi';
import { Schema } from "./schema";
import { PlayerId, PlayerLogin, PlayerChosenValues } from "./schema-player-item";

export class SchemaPlayerBuilder {
  createPlayerValidator<T>(): ObjectSchema<T> {
    const playerSchema = new Schema<T>();

    playerSchema.add(new PlayerId().schema);
    playerSchema.add(new PlayerLogin().schema);

    return playerSchema.schemaMap;
  }

  createChosenValuesValidator<T>(): ObjectSchema<T> {
    const chosenValuesSchema = new Schema<T>();

    chosenValuesSchema.add(new PlayerId().schema);
    chosenValuesSchema.add(new PlayerChosenValues().schema);

    return chosenValuesSchema.schemaMap;
  }
}
