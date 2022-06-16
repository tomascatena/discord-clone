import { DEFAULT_ERROR_MESSAGES, validate } from './validator';

describe('validator', () => {
  describe('required', () => {
    test('should validate required value when input is ""', () => {
      const validationResults = validate('').required().exec();

      expect(validationResults.isValid).toBe(false);
      expect(validationResults.validationErrors).toStrictEqual([DEFAULT_ERROR_MESSAGES.required]);
    });

    test('should validate required value when input is "input string"', () => {
      const validationResults = validate('input string').required().exec();

      expect(validationResults.isValid).toBe(true);
      expect(validationResults.validationErrors).toStrictEqual([]);
    });
  });

  describe('isNumeric', () => {
    test('should validate non numeric input', () => {
      const validationResults = validate('123abc').isNumeric().exec();

      expect(validationResults.isValid).toBe(false);
      expect(validationResults.validationErrors).toStrictEqual([DEFAULT_ERROR_MESSAGES.isNumeric]);
    });

    test('should validate numeric input', () => {
      const validationResults = validate('123').isNumeric().exec();

      expect(validationResults.isValid).toBe(true);
      expect(validationResults.validationErrors).toStrictEqual([]);
    });
  });

  describe('isEmail', () => {
    test('should validate invalid email', () => {
      const validationResults = validate('emailexample.com').isEmail().exec();

      expect(validationResults.isValid).toBe(false);
      expect(validationResults.validationErrors).toStrictEqual([DEFAULT_ERROR_MESSAGES.isEmail]);
    });

    test('should validate correct email', () => {
      const validationResults = validate('email@example.com').isEmail().exec();

      expect(validationResults.isValid).toBe(true);
      expect(validationResults.validationErrors).toStrictEqual([]);
    });

    test('should validate and normalize correct email', () => {
      const validationResults = validate('EMAIL@EXAMPLE.COM').isEmail().exec();

      expect(validationResults.isValid).toBe(true);
      expect(validationResults.validationErrors).toStrictEqual([]);
      expect(validationResults.value).toBe('email@example.com');
    });
  });

  describe('isLength', () => {
    test.each([
      ['a', 2, 10],
      ['too long input', 2, 10],
      ['', 2, 10],
    ])('should validate length when input is %s', (input, min, max) => {
      const validationResults = validate(input).isLength({ min, max }).exec();

      expect(validationResults.isValid).toBe(false);
      expect(validationResults.validationErrors).toStrictEqual([`Must be between ${min} and ${max} characters long.`]);
    });

    test('should validate input of correct length', () => {
      const validationResults = validate('example').isLength({ min: 2, max: 10 }).exec();

      expect(validationResults.isValid).toBe(true);
      expect(validationResults.validationErrors).toStrictEqual([]);
    });
  });

  describe('isAlphaWithSpecialCharacters', () => {
    test.each([
      [''],
      [' '],
      [' some string'],
      ['some string !'],
      ['some string!'],
      ['! some string'],
      ['!some string'],
      ['some !string'],
      ['some! string'],
      ['some ! string'],
      ['!#'],
    ])('should validate length when input is %s', (input) => {
      const validationResults = validate(input).isAlphaWithSpecialCharacters().exec();

      expect(validationResults.isValid).toBe(false);
      expect(validationResults.validationErrors).toStrictEqual([DEFAULT_ERROR_MESSAGES.isAlphaWithSpecialCharacters]);
    });

    test.each([
      ['tomas'],
      ['mañana'],
    ])('should validate %s', (input) => {
      const validationResults = validate(input).isAlphaWithSpecialCharacters().exec();

      expect(validationResults.isValid).toBe(true);
      expect(validationResults.validationErrors).toStrictEqual([]);
    });
  });

  describe('isURL', () => {
    test('should validate invalid URL', () => {
      const validationResults = validate('googlecom').isURL().exec();

      expect(validationResults.isValid).toBe(false);
      expect(validationResults.validationErrors).toStrictEqual([DEFAULT_ERROR_MESSAGES.isURL]);
    });

    test('should validate correct URL', () => {
      const validationResults = validate('http://www.google.com').isURL().exec();

      expect(validationResults.isValid).toBe(true);
      expect(validationResults.validationErrors).toStrictEqual([]);
    });
  });

  describe('isAlpha', () => {
    test('should validate invalid alpha input', () => {
      const validationResults = validate('abc123').isAlpha().exec();

      expect(validationResults.isValid).toBe(false);
      expect(validationResults.validationErrors).toStrictEqual([DEFAULT_ERROR_MESSAGES.isAlpha]);
    });

    test('should validate correct alpha input', () => {
      const validationResults = validate('correct').isAlpha().exec();

      expect(validationResults.isValid).toBe(true);
      expect(validationResults.validationErrors).toStrictEqual([]);
    });
  });

  describe('isGithubUsername', () => {
    test.each([
      [''],
      [' github-username'],
      ['github-username '],
      ['github--username'],
      ['-github-username'],
      ['github-username-'],
      ['github-username-github-username-github-username'],
    ])('should validate invalid Github username', (input) => {
      const validationResults = validate(input).isGithubUsername().exec();

      expect(validationResults.isValid).toBe(false);
      expect(validationResults.validationErrors).toStrictEqual([DEFAULT_ERROR_MESSAGES.isGithubUsername]);
    });

    test('should validate correct Github username', () => {
      const validationResults = validate('github-username').isGithubUsername().exec();

      expect(validationResults.isValid).toBe(true);
      expect(validationResults.validationErrors).toStrictEqual([]);
    });
  });

  describe('custom', () => {
    test('should validate a wrong input for a custom validation passed as a callback', () => {
      const validationResults = validate('some input').custom('Custom error message',
        value => {
          return value === 'I was expecting something else';
        }
      ).exec();

      expect(validationResults.isValid).toBe(false);
      expect(validationResults.validationErrors).toStrictEqual(['Custom error message']);
    });

    test('should validate a correct input for a custom validation passed as a callback', () => {
      const validationResults = validate('correct input').custom('Custom error message',
        value => {
          return value === 'correct input';
        }
      ).exec();

      expect(validationResults.isValid).toBe(true);
      expect(validationResults.validationErrors).toStrictEqual([]);
    });
  });
});
