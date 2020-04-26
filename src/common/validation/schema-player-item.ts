import { StringSchema } from '@hapi/joi';
import Joi = require('@hapi/joi');
import { SchemaItem } from './schema';

export class PlayerLogin extends SchemaItem<StringSchema> {
  constructor() {
    super('player_name', Joi.string().required());
  }
}

export class PlayerId extends SchemaItem<StringSchema> {
  constructor() {
    super('player_id', Joi.string().required());
  }
}

export class PlayerChosenValues extends SchemaItem<StringSchema> {
  constructor() {
    super('chosenValues', Joi.array().items(Joi.string()).required());
  }
}
