![](https://raw.githubusercontent.com/RafalFilipek/styled-props/master/logo.png)

---

[![Greenkeeper badge](https://badges.greenkeeper.io/RafalFilipek/styled-props.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/RafalFilipek/styled-props.svg?branch=master)](https://travis-ci.org/RafalFilipek/styled-props)
[![Code Coverage](https://img.shields.io/codecov/c/github/RafalFilipek/styled-props/master.svg)](https://codecov.io/gh/RafalFilipek/styled-props)
[![Code Style](https://img.shields.io/badge/codestyle-airbnb-brightgreen.svg)](https://github.com/airbnb/javascript)

Simple lib that allows you to set *styled props* in your [*styled-components*](https://styled-components.com) without stress. Let's take `Button` component from styled-components web page. Here it is:

```jsx
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25 em 1em;
  border: 2px solid palevioletred;
  border radius: 3px;

  background: ${props => props.primary && 'palevioletred'}
  color: ${props => props.primary ? 'white' : 'palevioletred'}
`;
```

Now you can simply write

```jsx
<Button>Hello</Button> or <Button primary>World!</Button>
```

But your application is probably much bigger than single button. And you want to keep your colors, sizes etc. in one place. So let's create simple `styles.js` file.

```js
// styles.js

export const background = {
  primary: '#F5F5F5',
  danger: '#DD2C00',
  success: '#7CB342',
  info: '#BBDEFB',
};

export const color = {
  primary: '#263238',
  default: '#FAFAFA',
};

export const size = {
  padding: {
    small: 10,
    medium: 20,
    big: 30,
  },
  borderRadius: {
    small: 5,
    default: 10,
  },
};
```

> `styles.js` file is cool because you can access them anywhere! You can also generate some style guides and of course keep all information in one place.

> **IMPORTANT** It is better to use singular forms for keys. In `bind` mode keys are used to set fallbacks so `color` is better than `colors` as a prop.

So how can I help? `styled-props` package exports single function called `styledProps`. You can use it in all your components.

### TL;DR; Examples

 - [Basic usage](http://www.webpackbin.com/N1EKUqgvG)
 - [Default props](http://www.webpackbin.com/41b0R5lPf)
 - [Bind](http://www.webpackbin.com/VJsMMoePf)


### Installation

```
yarn add styled-props

// or

npm install styled-props
```

### Basic usage

```jsx
import styledProps from 'styled-props';
import styled from 'styled-components';
import {
  background,
  color,
  size,
} from './styles.js';

const Button = styled.button`
  background: ${styledProps(background)};
  color: ${styledProps(color)};
  padding: ${styledProps(size.padding)}px;
  border-radius: ${styledProps(size.borderRadius)}px;

  font-size: 1em;
  margin: 1em;
  border: 2px solid palevioletred;
`;

export default () => (
  <div>
    <Button primary small>This</Button>
    <Button info medium>is</Button>
    <Button danger big>so</Button>
    <Button success medium>cool!</Button>
  </div>
)
```

As you can see each prop can be mapped into specific value for selected css rule. If you need another combination, you just add it in `styles.js`.

### Default values

Everything is based on props. As we know in React you can set `defaultProps` for each component. You can also use them to set default values for styles. For example:

```jsx
const Button = styled.button`
  color: ${styledProps(color, 'color')}
`;
Button.defaultProps = {
  color: 'default',
};
```

If you will not provide `primary` or `default` property for Button component `styledProps` function will check value of `color` property and use it as a key in `color` map. In our case default color is `color.white`. This is quite cool because you can also set styles the old way:

```jsx
<Button color="primary" size="big" />
```

### Bind

When your component is full of dynamic styles you can ( from `v0.1.0`) use `bind` options to simplify things.

```js
//styles.js
export default {
  color: {
    red: '#990000',
    white: '#ffffff',
    black: '#000000',
  },
  size: {
    small: 10,
    medium: 20,
    big: 30,
  }
}
```

```jsx
import styles from './styles';
import { bindStyles } from 'styled-props';

// or alternatively

// import { bind } from 'styled-props';

s = bindStyles(styles);

export default styled.button`
  color: ${s.color};
  padding: ${s.size};
`;
```

> As you can see `bind` is available as `bind` or `bindStyles` in case you're using lodash or any other library to for e.g bind functions context.

Each key in `s` provides `styledProps` function. Also default value is set automaticly with `key` from map.

```
s.color === styledProps(styles.color, 'color');
```

### API

```
styledProps(stylesMap:Object, [fallbackKey]:string)

styledPropsBind(collectionsMap:Object)
```

### [Demo](http://www.webpackbin.com/NkSd_zRBM)
