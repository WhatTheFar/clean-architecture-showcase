import {
  containALowercase,
  containAnUppercase,
  isLengthInRange,
} from './password';

describe('Password Validators', () => {
  describe('Contain a lowercase', () => {
    describe.each`
      passwd      | expected
      ${'12345'}  | ${false}
      ${'abc'}    | ${true}
      ${'ABC'}    | ${false}
      ${'aBc123'} | ${true}
    `('containeALowercase("$passwd")', ({ passwd, expected }) => {
      const actual = containALowercase(passwd);

      test(`returns ${expected}`, () => {
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('Contain an uppercase', () => {
    describe.each`
      passwd      | expected
      ${'12345'}  | ${false}
      ${'abc'}    | ${false}
      ${'ABC'}    | ${true}
      ${'aBc123'} | ${true}
    `('containAnUppercase("$passwd")', ({ passwd, expected }) => {
      const actual = containAnUppercase(passwd);

      test(`returns ${expected}`, () => {
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('Match the minimum and maximum length', () => {
    describe.each`
      passwd            | expected
      ${'12345'}        | ${false}
      ${'1234567'}      | ${false}
      ${'12345678'}     | ${true}
      ${'123456789'}    | ${true}
      ${'1'.repeat(31)} | ${true}
      ${'1'.repeat(32)} | ${true}
      ${'1'.repeat(33)} | ${false}
    `('isLengthInRange("$passwd")', ({ passwd, expected }) => {
      const min = 8;
      const max = 32;
      const actual = isLengthInRange(passwd, min, max);

      test(`returns ${expected}`, () => {
        expect(actual).toEqual(expected);
      });
    });
  });
});
