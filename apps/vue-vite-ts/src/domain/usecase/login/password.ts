import SuperExpressive from 'super-expressive';

export function containALowercase(text: string): boolean {
  const re = SuperExpressive() //
    .singleLine //
    .startOfInput //
    .zeroOrMore //
    .nonWhitespaceChar //
    .oneOrMore //
    .range('a', 'z') //
    .zeroOrMore //
    .nonWhitespaceChar //
    .endOfInput //
    .toRegex();

  return re.test(text);
}

export function containAnUppercase(text: string): boolean {
  const re = SuperExpressive() //
    .singleLine //
    .startOfInput //
    .zeroOrMore //
    .nonWhitespaceChar //
    .oneOrMore //
    .range('A', 'Z') //
    .zeroOrMore //
    .nonWhitespaceChar //
    .endOfInput //
    .toRegex();

  return re.test(text);
}

export function isLengthInRange(
  text: string,
  min: number,
  max: number
): boolean {
  return min <= text.length && text.length <= max;
}
