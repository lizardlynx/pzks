import { LexicalConvolution } from '../../lexicalConvolution';
import {Descriptor} from '../../descriptor';

// const Descriptor = DescriptorModule.Descriptor;
type TestDataTuple = [string, number];

//
const testDataCorrect: TestDataTuple[] = [['-x(x+(-(-y-2)))', 15], 
  ['a*b*c+a*b*d+a*c*k-cc*k1*c+d2-k-b+t*0', 33],
  ['a*b+a*c+b*c', 11],
  ['a*b+a*k*(e*c+b*c-b*e)', 21],
  ['a*b*c+a*b*d/t+a*c*k-c*k*e+d(r)-1.013-b+t*0', 38]];

const testDataWrong: TestDataTuple[] = [['-x(x%+(-(-y-2)))', 1],
  ['a*b+a*c%%+b*c', 2],
  ['a*b+a*$k*(e*c+!b*c-b&*e)', 3],
  ['a*b*c+a*b*d/t+a*c*k-c*k*e+d(r)-1.01.3-b+t*0', 1]];

describe('LexicalConvolution', () => {
  let logSpy: jest.SpyInstance;
  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.clearAllMocks();
  });
  describe('createLexemas', () => {
    test('should throw an error', () => {
      const func = () => LexicalConvolution.createLexemas('a+ b');
      expect(func).toThrow(Error);
    });

    test('should return empty', () => {
      const res = LexicalConvolution.createLexemas('');
      
      expect(res).toEqual([[], false]);
    });

    test.each<TestDataTuple>(testDataCorrect)('should return descriptors', (val, descNum) => {
      const res = LexicalConvolution.createLexemas(val);
      
      expect(res[0]).toHaveLength(descNum);
      expect(res[1]).toBe(false);
    });

    test.each<TestDataTuple>(testDataWrong)('should return errors', (val, errorNum) => {
      const res = LexicalConvolution.createLexemas(val);
      expect(logSpy).toHaveBeenCalledTimes(errorNum);
      expect(res[1]).toBe(true);
    });
  })
});
