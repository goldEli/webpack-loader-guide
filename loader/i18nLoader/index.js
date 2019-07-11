var i18n = require("../../i18n/index")["zh"]
var REG = require("../reg")
var utility = require("./utility")

function i18nLoader(source, map) {

  if (isI18nIgnore(source)) {
    this.callback(null, source, map);
    return 
  }

  const newSource = source
    .split("\n")
    .map(line => {
      return handleLine(line);
    })
    .join("\n");
  this.callback(null, newSource, map);
};



// 判断文件中是否包含 i18nIgnore ，如果包含，就忽略此文件不进行国际化
function isI18nIgnore (source){
  return REG.I18N_IGNORE.test(source)
}

// 将每行中的中文替换成变量
function handleLine(line) {
  let newLine;
  let chineseSentences = line.match(
    REG.CHINESE_SENTENCE
  );
  chineseSentences &&
    chineseSentences.forEach(chineseSentence => {
      const key = utility.getKeyByValue(chineseSentence, i18n);
      if (key) {
        newLine = newLine
          ? newLine.replace(chineseSentence, `window.i18n['${key}']`)
          : line.replace(chineseSentence, `window.i18n['${key}']`);
      } else {
        utility.addChineseWarning(chineseSentence)
      }
    });
  return newLine || line;
}

module.exports = i18nLoader