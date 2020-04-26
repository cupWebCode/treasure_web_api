import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema, ValidationErrorItem } from '@hapi/joi';
import { ResponseApi } from 'src/common/response-api';

@Injectable()
export class RequestValidatorPipe<T> implements PipeTransform<T, T> {
  constructor(private readonly schema: ObjectSchema) { }

  transform(value: T, metadata: ArgumentMetadata): T {
    const { error } = this.schema.validate(value);
    if (error && error.isJoi) {
      throw new BadRequestException(
        new ResponseApi<Array<string>>(false, this.convertError(error.details))
      );
    }

    return value;
  }

  private convertError(errors: ValidationErrorItem[]): string[] {
    return errors.map(error => error.message);
  }
}
