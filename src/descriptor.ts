import { LexemType } from "./types";

export class Descriptor {
  private _type: LexemType;
  private _value: string;
  constructor(type: LexemType, value: string) {
    this._type = type;
    this._value = value;
  }

  get type(): LexemType {
    return this._type;
  }

  addValue(value: string): void {
    if ([LexemType.FLOAT, LexemType.LETTER, LexemType.NUMBER].includes(this._type))
      this._value += value;
  }

  get value() {
    return this._value;
  }

  set type(type: LexemType) {
    if (this._type == LexemType.NUMBER && type == LexemType.FLOAT ||
    this._type == LexemType.LETTER && type == LexemType.FUNCTION)
      this._type = type;
  }
}
