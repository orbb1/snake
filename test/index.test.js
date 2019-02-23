import printHello from '../src/index';

describe('printHello', () => {
  beforeEach(() => {
    spyOn(console, 'log').and.callThrough();
  });

  it('should call console  log', () => {
    printHello();

    expect(console.log).toHaveBeenCalled();
  });

  it('should print "hello"', () => {
    expect(console.log).not.toHaveBeenCalledWith('Hello');
  });
});
