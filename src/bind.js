import styledProps from './styledProps';

type PropsLike = { [key:string]: any };
type StyledPropsMap = { [key:string]: typeof styledProps };
type BindFunction = (map:PropsLike) => StyledPropsMap;

const bind:BindFunction = map => (
  Object.keys(map).reduce((memo:StyledPropsMap, key:string) => {
    // eslint-disable-next-line no-param-reassign
    memo[key] = styledProps(map[key], key);
    return memo;
  }, {})
);

export default bind;
