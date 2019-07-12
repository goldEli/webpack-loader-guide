const uuidv3 = require('uuid/v3');
var REG = require("../reg")

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
    `"${uuidv3(chineseSentence, uuidv3.URL)}": ${chineseSentence},`,
  )
}

exports.isI18nIgnore = function (source){
  return REG.I18N_IGNORE.test(source)
}