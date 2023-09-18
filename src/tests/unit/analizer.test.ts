import { LexicalConvolution } from "../../lexicalConvolution";
// const LexConvMock = {
//   createLexemas: 
// }

import { Analizer } from "../../analizer";
// jest.mock('../../lexicalConvolution');

type TestDataTuple = [string, number];
const testDataCorrect: string[] = ['-x(x+(-(-y-2)))', 
  'a*b*c+a*b*d+a*c*k-cc*k1*c+d2-k-b+t*0',
  'a*b+a*c+b*c',
  'a*b+a*k*(e*c+b*c-b*e)',
  'a*b*c+a*b*d/t+a*c*k-c*k*e+d(r)-1.013-b+t*0'];

  const testDataWrong: TestDataTuple[] = [['-x(x%+(-(-y-2)))', 1],
  ['a*b+a*c%%+b*c', 2],
  ['a*b+a*$k*(e*c+!b*c-b&*e)', 3],
  ['a*b*c+a*b*d/t+a*c*k-c*k*e+d(r)-1.01.3-b+t*0', 1],
  ['a+2+(b+5-x-u-8-1+0)+b-c-d-e/f/2+1+2/2+0*k*2*v*(2-2)*', 1],
  ['+)1a+2+(b+5-x-u-8-1+0)+b-c-d-e/f/2+1+2/2+0*k*2*v*(2-2)*', 5]];

describe('Analizer', () => {
  describe('checkExpression', () => {
    let logSpy: jest.SpyInstance;
    beforeEach(() => {
      jest.clearAllMocks();
      logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    test('should return false if errors vere found', () => {
      jest.spyOn(LexicalConvolution, 'createLexemas').mockReturnValueOnce([[], true]);

      const analizer = new Analizer();
      const res = analizer.checkExpression('a+b&');
      expect(res).toEqual(false);
    });

    test.each(testDataCorrect)('should return true', (expr) => {
      const analizer = new Analizer();
      const res = analizer.checkExpression(expr);
      expect(logSpy).toBeCalledTimes(2);
      expect(res).toEqual(true);
    });

    test.each(testDataWrong)('checking \'%s\'should return \'%s\' errors', (expr, times) => {
      const analizer = new Analizer();
      const res = analizer.checkExpression(expr);
      expect(logSpy).toBeCalledTimes(times + 1);
      expect(res).toEqual(false);
    });
  });
});
