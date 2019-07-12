var i18n = require("../../i18n/index")["zh"]
var REG = require("../reg")
var utility = require("./utility")

function i18nLoader(source, map) {

  // 当文件中出现 i18nIgnore 就忽略此文件，此文件不做国际化操作
  if (utility.isI18nIgnore(source)) {
    this.callback(null, source, map);
    return 
  }

  let skip = false
  const newSource = source
    .split("\n")
    .map(line => {

      // if the line is a sing line comment, skip it. 
      if (REG.SING_LINE_COMMENT.test(line)) {

        if (REG.NO_I18N_THIS_BLOCK_START.test(line)) {
          skip = true
        }
  
        if (REG.NO_I18N_THIS_BLOCK_END.test(line)) {
          skip = false
          return line
        }

        return line
      }

      if (REG.MULTI_LINE_COMMENT_START.test(line)) {
        skip = true
      }

      if (REG.MULTI_LINE_COMMENT_END.test(line)) {
        skip = false
        return line
      }
      

      return skip ? line : replaceChineseWithTheVariable(line);
    })
    .join("\n");
  this.callback(null, newSource, map);

};

// 将每行中的中文替换成变量
function replaceChineseWithTheVariable(line) {
  
  let newLine;

  // get chinese sentences by line
  let chineseSentences = line.match(
    REG.CHINESE_SENTENCE
  );

  chineseSentences &&
    chineseSentences.forEach(chineseSentence => {
      const key = utility.getKeyByValue(chineseSentence, i18n);
      // chinese sentence in i18n resource
      if (key) {
        newLine = newLine
          ? newLine.replace(chineseSentence, `window.i18n['${key}']`)
          : line.replace(chineseSentence, `window.i18n['${key}']`);
      } else {
        // Throw an error on terminal to inform people that there is a new chinese sentence 
        utility.addChineseWarning(chineseSentence)
      }
    });

  return newLine || line;
}

module.exports = i18nLoader