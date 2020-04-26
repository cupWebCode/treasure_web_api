import { StringSchema, SchemaMap } from '@hapi/joi';
import { ObjectSchema } from '@hapi/joi';
import Joi = require('@hapi/joi');

export type Rule<T> = { [x: string]: T };

export abstract class SchemaItem<T> {
  constructor(public name: string, public rule: T) { }

  get schema(): Rule<T> {
    return {
      [this.name]: this.rule
    }
  }
}

export class Schema<T> {
  private schema: ObjectSchema<T> = Joi.object({});

  add(rule: SchemaMap<Rule<StringSchema>>) {
    this.schema = this.schema.append(rule);
  }

  get schemaMap(): ObjectSchema<T> {
    return this.schema;
  }
}
