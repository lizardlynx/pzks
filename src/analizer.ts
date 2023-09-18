import { Descriptor } from "./descriptor";
import { LexicalConvolution } from "./lexicalConvolution";
import { states, LexemType } from "./types";

export class Analizer {
  private parentheses: Descriptor[] = [];
  private errors: string[] = [];
  checkExpression(expr: string): boolean {
    console.log(`Processing expression: '${expr}'`);
    
    let state = 'start';
    let lastValue = '';
    const [lexemas, error]: [Descriptor[], boolean] = LexicalConvolution.createLexemas(expr);
    if (error) return false;
    for (const lexema of lexemas) {
      let type = lexema.type;
      const value = lexema.value;
      
      const nextStates = states[state];
      
      if (!nextStates.includes(type))
      {
        if(lexema.value == '-' && nextStates.includes(LexemType.MINUS_SIGN)) {
          type = LexemType.MINUS_SIGN;
          lexema.type = LexemType.MINUS_SIGN;
        } else {
          this.errors.push(`It is not allowed to use ${type} '${value}' after the ${state} '${lastValue}'
          Please use the following: (${nextStates.join(' | ')})`);
        }
      }
        
      if (type == LexemType.OPEN_BRACKET) this.handleOpenParent(lexema);
      else if (type == LexemType.CLOSE_BRACKET) this.handleClosedParent();

      state = type;
      lastValue = value;
    }

    if (!(states['end'].includes(state as LexemType))) this.errors.push(`It is not allowed to use ${state} '${lastValue}' at the end
      Please use the following: (${states['end'].join(' | ')})`);
    let noError = true;
    if (this.parentheses.length != 0) this.errors.push('Not all brackets were closed!');
    for (let i=0; i < this.errors.length; i++) {
      noError = false;
      console.log(`ERROR: ${this.errors[i]}`);
    }
    this.errors = [];
    if(noError) console.log('No errors were found.');
    return noError;
  }

  private handleOpenParent(desc: Descriptor): void {
    this.parentheses.push(desc);
  }

  private handleClosedParent(): void {
    if (this.parentheses.length == 0) this.errors.push('Extra close bracket!');
    this.parentheses.pop();
  }
}
