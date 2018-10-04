## First round:

1. Add description:
  * function description;
  * input and result params description.
1. Setup ESLint + airbnb, turned to company/project Style Guide:
  * it whould allow automatic format and style check before review.
1. use company Naming convention (Style Guide) for function naming.
1. give recommendation to author to check result with description: to exclude logical errors.

Return code to author.

## Second and next rounds:

1. Point to logical errors ()
1. point on available refactoring methods.

```
/**
 * getLastMatchIndex - поиск (с конца строки) символа,
 *   совпадающего с одним из символов полученных в аргументах
 * @param {string} s - строка, в которой производится поиск
 * @param  {...any} chars - искомые символы
 * @returns {number} индекс найденного символа, -1 - во всех остальных случаях
 */
const getLastMatchIndex = (s, ...chars) => {
  if (typeof s !== 'string' || s.length === 0) {
    return -1;
  }

  const len = s.length;

  for (let i = len - 1; i >= 0; i -= 1) {
    // ES6
    // if (chars.indexOf(s[i]) !== -1) {
    // ES7
    if (chars.includes(s[i])) {
      return i;
    }
  }
  return -1;
};

// const res = func('zabz', 'a', 'z');
let res = getLastMatchIndex('zabz', 'x', 'a', 'b');
console.log(res);
res = getLastMatchIndex('zabc', 'a', 'b');
console.log(res);
res = getLastMatchIndex(1, 'a', 'b');
console.log(res);
res = getLastMatchIndex(['a', 'b', 'z'], 'a', 'b');
console.log(res);
```