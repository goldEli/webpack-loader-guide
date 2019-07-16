const uuidv3 = require("uuid/v3");
var REG = require("./reg");

exports.isSigleLineComment = function (str) {
  REG.SING_LINE_COMMENT.lastIndex = 0;
  return REG.SING_LINE_COMMENT.test(str)
}

exports.isNoI18nBlockStart = function (str) {
  REG.NO_I18N_THIS_BLOCK_START.lastIndex = 0;
  return REG.NO_I18N_THIS_BLOCK_START.test(str)
}

exports.isNoI18nBlockEnd = function (str) {
  REG.NO_I18N_THIS_BLOCK_END.lastIndex = 0;
  return REG.NO_I18N_THIS_BLOCK_END.test(str)
}

exports.isNultiLineCommentStart = function (str) {
  REG.MULTI_LINE_COMMENT_START.lastIndex = 0;
  return REG.MULTI_LINE_COMMENT_START.test(str)
}

exports.isNultiLineCommentEnd = function (str) {
  REG.MULTI_LINE_COMMENT_END.lastIndex = 0;
  return REG.MULTI_LINE_COMMENT_END.test(str)
}

exports.isI18nIgnore = function(source) {
  return REG.I18N_IGNORE.test(source);
};

// 将每行中的中文替换成变量
exports.replaceChineseWithTheVariable = function (line, i18n) {
  
  let newLine;

  // get chinese sentences by line
  let chineseSentences = line.match(
    REG.CHINESE_SENTENCE
  );

  chineseSentences &&
    chineseSentences.forEach(chineseSentence => {
      const key = getKeyByValue(chineseSentence, i18n);
      // chinese sentence in i18n resource
      if (key) {
        newLine = newLine
          ? newLine.replace(chineseSentence, `window.i18n['${key}']`)
          : line.replace(chineseSentence, `window.i18n['${key}']`);
      } else {
        // Throw an error on terminal to inform people that there is a new chinese sentence 
        addChineseWarning(chineseSentence)
      }
    });

  return newLine || line;
}

function getKeyByValue (value, obj) {
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    if (`"${obj[key]}"` === value) {
      return key;
    }
  }
  return null;
};

 function addChineseWarning (chineseSentence) {
  if (process.env.NODE_ENV === 'development') {
    setTimeout(() => {
      console.log(
        "\x1b[31m",
        `"${uuidv3(chineseSentence, uuidv3.URL)}": ${chineseSentence},`,
      )
    }, 0)
  } else {
    throw new Error(
      `
      新增中文未做国际化，请切换到开发模式（yarn hot），更新国际化资源。 
      "${uuidv3(chineseSentence, uuidv3.URL)}": ${chineseSentence},
      `
    );
  }
};