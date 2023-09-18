import {Descriptor} from '../../descriptor'
import { LexemType } from '../../types';

type SetTypeTuple = [LexemType, string, LexemType, LexemType]

describe('Descriptor', () => {
  describe('Descriptor constructor, get value, get type', () => {
    test.each([[LexemType.CLOSE_BRACKET, ')'],
                [LexemType.OPEN_BRACKET, '('],
                [LexemType.FLOAT, '3.14'],
                [LexemType.NUMBER, '23'],
                [LexemType.LETTER, 'abc'],
                [LexemType.SIGN, '+']])
                ('should create descriptor of type \'%s\' and set value \'%s\'', (lexemType, value) => {
      const d: Descriptor = new Descriptor(lexemType, value);
      expect(d.type).toEqual(lexemType);
      expect(d.value).toEqual(value)
    })
  })
  describe('addValue', () => {
    test.each([[LexemType.CLOSE_BRACKET, ')', '(', ')'],
                [LexemType.OPEN_BRACKET, '(', ')', '('],
                [LexemType.FLOAT, '3.14', '5', '3.145'],
                [LexemType.NUMBER, '23', '4', '234'],
                [LexemType.LETTER, 'abc', 'g', 'abcg'],
                [LexemType.SIGN, '+', '-', '+']])
                ('\'%s\' value \'%s\' + value \'%s\' must equal \'%s\'', (lexemType, value, symbol, expected) => {
      const d = new Descriptor(lexemType, value);
      expect(d.value).toEqual(value);
      d.addValue(symbol);
      expect(d.value).toEqual(expected);
    });
  })

  describe('setType', () => {
    test.each<SetTypeTuple>([[LexemType.CLOSE_BRACKET, ')', LexemType.FLOAT, LexemType.CLOSE_BRACKET],
                [LexemType.NUMBER, '23', LexemType.FLOAT, LexemType.FLOAT],
                [LexemType.LETTER, 'abc', LexemType.FUNCTION, LexemType.FUNCTION]])
                ('initial type \'%s\'(\'%s\') update to \'%s\' must equal \'%s\'', (lexemType, value, newType, expected) => {
      const d = new Descriptor(lexemType, value);
      d.type = newType;
      expect(d.type).toEqual(expected);
    });
  });
  
});
