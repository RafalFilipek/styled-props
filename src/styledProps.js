// @flow

type PropsLike = { [key:string]: any };
type MapperFunction = (props:PropsLike) => any;
export type StyledPropsFunction = (map:PropsLike, fallback?:string) => MapperFunction;

const styledProps:StyledPropsFunction = (map, fallback) => ((props) => {
  const keysFromProps:string[] = Object.keys(map).filter(key => props[key] !== undefined);
  if (keysFromProps.length > 1) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(`[styledProps] Multiple props provided: ${keysFromProps.join(', ')}.`);
    }
  }
  const keyFromProps = keysFromProps[0];
  if (map[keyFromProps]) {
    return map[keyFromProps];
  }
  if (fallback) {
    if (props[fallback] && map[props[fallback]]) {
      return map[props[fallback]];
    }
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(`[styledProps] Unknown fallback prop provided: ${fallback}.`);
    }
  }
  return undefined;
});

export default styledProps;
