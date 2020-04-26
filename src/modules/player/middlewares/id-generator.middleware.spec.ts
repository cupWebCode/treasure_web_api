import { IdGeneratorMiddleware } from './id-generator.middleware';

describe('IdGeneratorMiddleware', () => {
  it('should be defined', () => {
    expect(new IdGeneratorMiddleware()).toBeDefined();
  });
});
