![](https://raw.githubusercontent.com/RafalFilipek/styled-props/master/loog.png)

---

[![Build Status](https://travis-ci.org/RafalFilipek/styled-props.svg?branch=master)](https://travis-ci.org/RafalFilipek/styled-props)
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

export const backgrounds = {
  primary: '#F5F5F5',
  danger: '#DD2C00',
  success: '#7CB342',
  info: '#BBDEFB',
};

export const colors = {
  primary: '#263238',
  default: '#FAFAFA',
};

export const sizes = {
  paddings: {
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



So how can I help? `styled-props` package exports single function called `styledProps`. You can use it in all your components.

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
  backgrounds,
  colors,
  sizes,
} from './styles.js';

const Button = styled.button`
  background: ${styledProps(backgrounds)};
  color: ${styledProps(colors)};
  padding: ${styledProps(sizes.paddings)}px;
  border-radius: ${styledProps(sizes.borderRadius)}px;

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
  color: ${styledProps(colors, 'color')}
`;
Button.defaultProps = {
  color: 'white',
};
```

If you will not provide `primary` or `default` property for Button component `styledProps` function will check value of `color` property and use it as a key in `colors` map. In our case default color is `colors.white`. This is quite cool because you can also set styles the old way:

```jsx
<Button color="primary" size="big" />
```

### API

```
styledProps(stylesMap:Object, [fallbackKey]:string)
```

### [Demo](http://www.webpackbin.com/NkSd_zRBM)
