/* eslint-env jest */

import styledProps from '../src';

const fonts = {
  small: 10,
  medium: 20,
  big: 30,
};

const colors = {
  red: 'red',
  blue: 'blue',
  green: 'green',
};

let consoleError;
beforeAll(() => {
  // eslint-disable-next-line no-console
  consoleError = console.error;
  console.error = (msg) => { throw new Error(msg); }
});

afterAll(() => {
  // eslint-disable-next-line no-console
  console.error = consoleError;
});

test('should be defined', () => {
  expect(styledProps).toBeDefined();
});

test('should return function', () => {
  expect(styledProps({}, 'foo')).toBeInstanceOf(Function);
});

test('should map props into values', () => {
  const props = {
    medium: true,
    blue: true,
  };

  expect(styledProps(fonts)(props)).toBe(20);
  expect(styledProps(colors)(props)).toBe('blue');
});

test('should warn about multiple values in map', () => {
  const props = {
    medium: true,
    big: true,
  };

  expect(() => styledProps(fonts)(props)).toThrowError(/medium, big/);
});

test('should return undefined for incorret values', () => {
  const props = {
    huge: true,
    pink: true,
  };

  expect(styledProps(fonts)(props)).toBe(undefined);
  expect(styledProps(colors)(props)).toBe(undefined);
});

test('should map into fallback values for incorret values', () => {
  const props = {
    huge: true,
    pink: true,
    size: 'medium',
    color: 'blue',
  };

  expect(styledProps(fonts, 'size')(props)).toBe(20);
  expect(styledProps(colors, 'color')(props)).toBe('blue');
});
