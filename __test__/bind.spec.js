/* eslint-env jest */
/* eslint-disable no-console */

import styledProps, { bind } from '../src';

const font = {
  small: 10,
  medium: 20,
  big: 30,
};

const color = {
  red: 'red',
  blue: 'blue',
  green: 'green',
};

const collections = { font, color };

test('should return object', () => {
  const s = bind(collections);

  expect(s).toBeInstanceOf(Object);
});

test('should contain provided keys', () => {
  const s = bind(collections);
  expect(Object.keys(s)).toEqual(Object.keys(collections));
});

test('each value should be equal to styledProps', () => {
  const s = bind(collections);
  const sp = styledProps(font);
  const props = { big: true };

  expect(s.font(props)).toBe(sp(props));
});

test('default value should be always provided', () => {
  const s = bind(collections);
  const sp = styledProps(font, 'font');
  const props = { font: 'small' };

  expect(s.font(props)).toBe(sp(props));
});
