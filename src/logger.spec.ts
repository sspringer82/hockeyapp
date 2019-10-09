import { HockeyLogger } from './logger';

describe('Logger', () => {
  it('should be defined', () => {
    expect(new HockeyLogger()).toBeDefined();
  });
});
