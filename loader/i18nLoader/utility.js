const uuidv3 = require('uuid/v3');

exports.getKeyByValue = function (value, obj) {
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    if (`"${obj[key]}"` === value) {
      return key;
    }
  }
  return null;
}

exports.addChineseWarning = function(chineseSentence) {
  console.log(
    "\x1b[31m",
    "新增中文：",
    `"${uuidv3(chineseSentence, uuidv3.URL)}": ${chineseSentence}`,
  )
}