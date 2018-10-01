## Первый шаг:

1. Добавить описание:
  - описание функции;
  - входные и выходные параметры.
1. Подключить ESLint + airbnb, настроенный на Style Guide компании и/или текущего проекта/библиотеки:
  - автоматическая проверка форматирования и стиля до review.
1. Переименовать ф-ю в соответствии с Naming convention (Style Guide) компании: как минимум, чтобы название отражало функционал.
1. Рекомендовать проверить результат на соответствие описанию, чтобы исключить логические ошибки.

Вернуть автору.

##Второй шаг и т.д.:

1. Проверить и указать на логические ошибки (есть вероятность, что автор их сам обнаружит после первого шага)
1. Дать рекомендации по рефакторингу.

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