'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var styledProps = function styledProps(map, fallback) {
  return function (props) {
    var keysFromProps = Object.keys(map).filter(function (key) {
      return props[key] !== undefined;
    });
    if (keysFromProps.length > 1) {
      // eslint-disable-next-line no-console
      console.error('[styledProps] Multiple props provided: ' + keysFromProps.join(', ') + '.');
    }
    var keyFromProps = keysFromProps[0];
    return map[keyFromProps] || (fallback ? map[props[fallback]] : undefined);
  };
};

exports.default = styledProps;