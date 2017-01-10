// @flow

type MapperFunction = (props:Object) => string | number | void;
type StyledPropsFunction = (map:Object, fallback:string) => MapperFunction;
type Props = { [key:string]: any };

const styledProps: StyledPropsFunction = (map:Props, fallback?) => ((props) => {
  const keysFromProps:string[] = Object.keys(map).filter(key => props[key] !== undefined);
  if (keysFromProps.length > 1) {
    // eslint-disable-next-line no-console
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[styledProps] Multiple props provided: ${keysFromProps.join(', ')}.`);
    }
  }
  const keyFromProps = keysFromProps[0];
  return map[keyFromProps] || (fallback ? map[props[fallback]] : undefined);
});

export default styledProps;
