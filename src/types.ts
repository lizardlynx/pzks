export enum LexemType {
  OPEN_BRACKET = 'open bracket', 
  CLOSE_BRACKET = 'close bracket', 
  NUMBER = 'number',
  FLOAT = 'float',
  MINUS_SIGN = 'minus sign', 
  SIGN = 'sign',  
  LETTER = 'letter', 
  FUNCTION = 'function'
};

export const constants: {[index: string]:number} = {
  pi: 3.14
};

export const dictionary: {[index: string]: LexemType} = {
  '(' : LexemType.OPEN_BRACKET,
  ')' : LexemType.CLOSE_BRACKET,
  '*' : LexemType.SIGN,
  '+' : LexemType.SIGN,
  '/' : LexemType.SIGN,
  '-' : LexemType.SIGN,
} as const;

export type State = {
  [index in LexemType | string]: LexemType[]
};

export const states: State = {
  'start': [LexemType.OPEN_BRACKET, LexemType.MINUS_SIGN, LexemType.NUMBER, LexemType.LETTER, LexemType.FUNCTION, LexemType.FLOAT],
  [LexemType.OPEN_BRACKET]: [LexemType.OPEN_BRACKET, LexemType.LETTER, LexemType.MINUS_SIGN, LexemType.NUMBER, LexemType.FUNCTION, LexemType.FLOAT],
  [LexemType.NUMBER]: [LexemType.SIGN, LexemType.CLOSE_BRACKET, LexemType.OPEN_BRACKET, LexemType.LETTER, LexemType.FUNCTION],
  [LexemType.FLOAT]: [LexemType.SIGN, LexemType.CLOSE_BRACKET, LexemType.OPEN_BRACKET, LexemType.LETTER, LexemType.FUNCTION],
  [LexemType.LETTER]: [LexemType.SIGN, LexemType.CLOSE_BRACKET, LexemType.OPEN_BRACKET, LexemType.FUNCTION],
  [LexemType.SIGN]: [LexemType.NUMBER, LexemType.OPEN_BRACKET, LexemType.FUNCTION, LexemType.LETTER, LexemType.FLOAT],
  [LexemType.CLOSE_BRACKET]: [LexemType.SIGN, LexemType.OPEN_BRACKET, LexemType.FUNCTION, LexemType.CLOSE_BRACKET],
  [LexemType.MINUS_SIGN]: [LexemType.NUMBER, LexemType.FUNCTION, LexemType.LETTER, LexemType.FUNCTION, LexemType.FLOAT, LexemType.OPEN_BRACKET],
  [LexemType.FUNCTION]: [LexemType.OPEN_BRACKET],
  'end': [LexemType.CLOSE_BRACKET, LexemType.FLOAT, LexemType.NUMBER, LexemType.LETTER]
};
