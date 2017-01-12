/* eslint-env jest */
/* eslint-disable no-console */

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
  consoleError = console.error;
  console.error = (msg) => { throw new Error(msg); };
});

afterAll(() => {
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

test('should warn about multiple values in map in DEV mode', () => {
  const props = {
    medium: true,
    big: true,
  };

  expect(() => styledProps(fonts)(props)).toThrowError(/medium, big/);

  process.env.NODE_ENV = 'production';

  expect(() => styledProps(fonts)(props)).not.toThrowError(/medium, big/);

  process.env.NODE_ENV = '';
});

test('should warn about incorret fallback prop in DEV mode', () => {
  const props = {
    huge: true,
    pink: true,
    _size: 'medium',
    _color: 'blue',
  };

  expect(() => styledProps(fonts, 'size')(props)).toThrowError(/size/);
  expect(() => styledProps(colors, 'color')(props)).toThrowError(/color/);

  process.env.NODE_ENV = 'production';

  expect(() => styledProps(fonts, 'size')(props)).not.toThrowError();
  expect(() => styledProps(colors, 'color')(props)).not.toThrowError();

  process.env.NODE_ENV = '';
});
