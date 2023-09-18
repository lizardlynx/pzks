import { Analizer } from "./analizer";

const expression: string = 'a+b/1c*exp(pi/2+t)(k-1)+m*2-ab/3.0001';
const analizer: Analizer = new Analizer();
analizer.checkExpression(expression);

