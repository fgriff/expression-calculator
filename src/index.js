function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  let start = 0;
  let end = 0;
  
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === '(') {
      start++;
    }
    
    if (expr[i] === ')') {
      end++;
    }
  }
  
  if (start !== end) {
    throw new Error('ExpressionError: Brackets must be paired');
  } else {
    start = 0;
    end = 0;
  }

  const exprToArr = expr.replace(/(\s+[-+/*()]\s+)/g, ' $1 ').trim().split(/\s+/g);

  for (let i = 0; i < exprToArr.length; i++) {
    if (exprToArr[i] === '(') {
      start = i;
    }

    if (exprToArr[i] === ')') {
      end = i;
      break;
    }
  }

  let subStr = [];
  let numbers = [];
  let signs = [];

  if (start === 0 && end === 0) {
    if (exprToArr.join(' ').indexOf(' ') + 1) {
      subStr = exprToArr;
    } else {
      subStr = exprToArr.join('').split('');
    }

    numbers = subStr.join(' ').match(/-?\d+(\.\d+)?/g).map((item) => Number(item));
    signs = subStr.join(' ').match(/\s[-+/*]\s/g).map((sign) => sign.trim());

    for (let i = 0; i < signs.length; i++) {
      switch (signs[i]) {
        case '*':
          const resMul = numbers[i] * numbers[i + 1];
          numbers.splice(i, 1, resMul);
          numbers.splice(i + 1, 1);
          signs.splice(i, 1);
          i--;

          break;

        case '/':
          if (numbers[i] === 0 || numbers[i + 1] === 0) throw new Error('TypeError: Division by zero.');

          const resDiv = numbers[i] / numbers[i + 1];
          numbers.splice(i, 1, resDiv);
          numbers.splice(i + 1, 1);
          signs.splice(i, 1);
          i--;

          break;
      }
    }

    for (let i = 0; i < signs.length; i++) {
      switch (signs[i]) {
        case '+':
          const resPlus = numbers[i] + numbers[i + 1];
          numbers.splice(i, 1, resPlus);
          numbers.splice(i + 1, 1);
          signs.splice(i, 1);
          i--;

          break;

        case '-':
          const resMin = numbers[i] - numbers[i + 1];
          numbers.splice(i, 1, resMin);
          numbers.splice(i + 1, 1);
          signs.splice(i, 1);
          i--;

          break;
      }
    }

    return Number(numbers[0].toFixed(4));
  } else {
    subStr = exprToArr.slice(start + 1, end);

    numbers = subStr.join(' ').match(/-?\d+(\.\d+)?/g).map((item) => Number(item));
    signs = subStr.join(' ').match(/\s[-+/*]\s/g).map((sign) => sign.trim());
  
    for (let i = 0; i < signs.length; i++) {
      switch (signs[i]) {
        case '*':
          const resMul = numbers[i] * numbers[i + 1];
          numbers.splice(i, 1, resMul);
          numbers.splice(i + 1, 1);
          signs.splice(i, 1);
          i--;
  
          break;
  
        case '/':
          if (numbers[i] === 0 || numbers[i + 1] === 0) throw new Error('TypeError: Division by zero.');
  
          const resDiv = numbers[i] / numbers[i + 1];
          numbers.splice(i, 1, resDiv);
          numbers.splice(i + 1, 1);
          signs.splice(i, 1);
          i--;
  
          break;
      }
    }
  
    for (let i = 0; i < signs.length; i++) {
      switch (signs[i]) {
        case '+':
          const resPlus = numbers[i] + numbers[i + 1];
          numbers.splice(i, 1, resPlus);
          numbers.splice(i + 1, 1);
          signs.splice(i, 1);
          i--;
  
          break;
  
        case '-':
          const resMin = numbers[i] - numbers[i + 1];
          numbers.splice(i, 1, resMin);
          numbers.splice(i + 1, 1);
          signs.splice(i, 1);
          i--;
  
          break;
      }
    }
  }

  exprToArr.splice(start, end - start + 1, numbers[0]);

  return expressionCalculator(exprToArr.join(' '));
}

module.exports = {
    expressionCalculator
}