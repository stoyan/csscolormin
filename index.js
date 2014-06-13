var color = require("color");
var string = require("color-string");

module.exports = function min(c) {

  if (Array.isArray(c)) {
    var colour = color({
      r: c[0],
      g: c[1],
      b: c[2],
    });
    if ('3' in c) {
      colour.alpha(c[3]);
    }
  } else {
    var colour = color(c);
  }
  var alpha = colour.values.alpha;
  
  if (alpha === 0) {
    return 'transparent';
  }
  
  if (alpha && alpha !== 1) {
    // no choice, gotta be rgba
    if (alpha < 1) {
      alpha = String(alpha).replace('0.', '.');
    }
    return string
      .rgbaString(colour.values.rgb, alpha)
      .replace(/ /g, '')
      .toLowerCase();
  }

  // hex, short hex, or keyword
  var hex = colour.hexString();
  if (hex[1] === hex[2] && hex[3] === hex[4] && hex[5] === hex[6]) {
    hex = ['#', hex[1], hex[3], hex[5]].join('');
  }
  var word = colour.keyword();
  if (!word || hex.length < word.length) {
    return hex.toLowerCase();
  }
  return word.toLowerCase();
};
