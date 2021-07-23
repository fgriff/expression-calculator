function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  function action(numArr, signsArr, oper, iteration) {
    const operations = {
      '+': (x, y) => x + y,
      '-': (x, y) => x - y,
      '*': (x, y) => x * y,
      '/': (x, y) => x / y,
    }

    const result = operations[oper](numArr[iteration], numArr[iteration + 1]);

    numArr.splice(iteration, 1, result);
    numArr.splice(iteration + 1, 1);
    signsArr.splice(iteration, 1);
  }

  let start = 0;
  let end = 0;
  
  for (let i = 0; i < expr.length; i++) {
    expr[i] === '(' ? start++ : expr[i] === ')' ? end++ : null;
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
          action(numbers, signs, signs[i], i);
          i--;

          break;

        case '/':
          if (numbers[i] === 0 || numbers[i + 1] === 0) throw new Error('TypeError: Division by zero.');

          action(numbers, signs, signs[i], i);
          i--;

          break;
      }
    }

    for (let i = 0; i < signs.length; i++) {
      switch (signs[i]) {
        case '+':
          action(numbers, signs, signs[i], i);
          i--;

          break;

        case '-':
          action(numbers, signs, signs[i], i);
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
          action(numbers, signs, signs[i], i);
          i--;
  
          break;
  
        case '/':
          if (numbers[i] === 0 || numbers[i + 1] === 0) throw new Error('TypeError: Division by zero.');

          action(numbers, signs, signs[i], i);
          i--;
  
          break;
      }
    }
  
    for (let i = 0; i < signs.length; i++) {
      switch (signs[i]) {
        case '+':
          action(numbers, signs, signs[i], i);
          i--;
  
          break;
  
        case '-':
          action(numbers, signs, signs[i], i);
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