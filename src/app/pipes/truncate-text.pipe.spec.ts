import { TruncateTextPipe } from './truncate-text.pipe';

describe('TruncateTextPipe', () => {
  let pipe: TruncateTextPipe;

  beforeEach(() => {
    pipe = new TruncateTextPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should truncate the text if it exceeds the specified limit', () => {
    var text = 'This is a long text';
    const limit: number = 10;

    const result = pipe.transform(text, limit);

    expect(result).toEqual(`${text.substring(0, limit)}...`);
  });

  it('should not truncate the text if it is within the limit', () => {
    var text = 'Short text';
    const limit: number = 20;

    const result = pipe.transform(text, limit);
    expect(result).toBe(text);
  });
});
