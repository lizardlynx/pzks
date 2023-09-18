import { Descriptor } from "./descriptor";
import { dictionary, LexemType } from "./types";

export class LexicalConvolution {
  private static lexemas: Descriptor[] = [];
  private static tempDesc: Descriptor | null = null;
  private static errors: string[] = [];
  static createLexemas(expr: string): [Descriptor[], boolean] {
    let length = expr.length;
    for (let i = 0; i < length; i++) {
      const symbol = expr[i];
      
      if (symbol == ' ')
      {
        this.tempDesc = null;
        this.errors = [];
        this.lexemas = [];
        throw new Error('Please remove all spaces');
      }
      const lexemType = this.getType(symbol);

      if (!lexemType) continue;
    
      if (Object.values(dictionary).includes(lexemType)) {
        if (this.tempDesc) this.tempDesc = null;
        const desc = new Descriptor(lexemType, symbol);
        this.lexemas.push(desc);
        continue;
      }
      const tempVal = this.tempDesc?.value;
      const tempType = this.tempDesc?.type;
      if (this.tempDesc && 
        (
          // (tempType == LexemType.FUNCTION && lexemType == LexemType.LETTER) ||
         (tempType == LexemType.FLOAT && lexemType == LexemType.NUMBER)
         || (tempType == LexemType.LETTER && lexemType == LexemType.NUMBER)
         || tempType == lexemType)) {
        // console.log(tempType, symbol, symbol === '.', tempVal);
        
        if (tempType == LexemType.FLOAT && symbol === '.')
          this.errors.push(`Cannot use more dots for the number ${tempVal}`)
        this.tempDesc.addValue(symbol);
        if (symbol === '.') this.tempDesc.type = LexemType.FLOAT;
        // if (tempType == LexemType.LETTER && !(this.tempDesc.value in constants))
        //   this.tempDesc.type = LexemType.FUNCTION;
      } else {
        this.tempDesc = new Descriptor(lexemType, symbol);
        this.lexemas.push(this.tempDesc);
      }
    }
    this.tempDesc = null;
    const lexemas: Descriptor[] = Array.from(this.lexemas);
    this.lexemas = [];
    let errors = false;
    
    for (let i=0; i < this.errors.length; i++) {
      errors = true;
      console.log(`ERROR: ${this.errors[i]}`);
    }
    this.errors = [];
    return [lexemas, errors];
  }

  private static getType(symbol: string): LexemType | null {
    let lexemType: LexemType = dictionary[symbol];
    if (lexemType !== undefined) return lexemType;
    if (this.isNum(symbol)) return LexemType.NUMBER;
    if (this.isCharLetter(symbol)) return LexemType.LETTER;
    this.errors.push('Remove symbol: '+ symbol + ' of type ' + typeof symbol);
    return null;
  }

  private static isCharLetter(char: string): boolean {
    return /^[a-zA-Z]$/i.test(char);
  }
  
  private static isNum(char: string): boolean {
    return /^[0-9\.]$/i.test(char);
  }
}