var i18n = require("../../i18n/index")["zh"];
var utility = require("./utility");
// const parser = require("@babel/parser")
// const traverse = require("@babel/traverse").default

/**
 * 在调用 this.callback 前，对 source 进行国际化处理
 * @param {string} source
 * @param {不知道是啥} map
 */
function i18nLoader(source, map) {
  // let ast = parser.parse(source)
  // console.log(ast)
  this.callback(null, handleI18n(source), map);
}

/**
 * 国际化处理
 * @param {*} source
 */
function handleI18n(source) {
  // 当文件中出现 i18nIgnore 就忽略此文件，不做国际化操作
  return utility.isI18nIgnore(source) ? source : handleSource(source);
}

/**
 * 处理文件每行的内容
 * 如果是注释或者忽略翻译，跳过不翻译
 * @param {string} line
 */
let skip = false;
function handleLine(line) {
  if (utility.isNoI18nBlockStart(line)) {
    skip = true;
    return line;
  }

  if (utility.isNoI18nBlockEnd(line)) {
    skip = false;
    return line;
  }

  if (utility.isSigleLineComment(line)) {
    // skip = true;
    return line;
  }

  if (utility.isNoI18nBlockStart(line)) {
    skip = true;
    return line;
  }

  if (utility.isNoI18nBlockEnd(line)) {
    skip = false;
    return line;
  }

  return skip ? line : utility.replaceChineseWithTheVariable(line, i18n);
}

/**
 * 将文件内容按照‘\n’分割成行，对每行内容进行处理（根据语言资源文件将中文语句替换成变量）
 * @param {string} source 单个文件内容
 */
function handleSource(source) {
  let skip = false;
  return (
    source
      .split("\n")
      .map(line => handleLine(line))
      // .map(line => {
      //   if (utility.isNoI18nBlockStart(line)) {
      //     skip = true;
      //     return line;
      //   }

      //   if (utility.isNoI18nBlockEnd(line)) {
      //     skip = false;
      //     return line;
      //   }

      //   if (utility.isSigleLineComment(line)) {
      //     skip = true;
      //     return line;
      //   }

      //   if (utility.isNoI18nBlockStart(line)) {
      //     skip = true;
      //     return line;
      //   }

      //   if (utility.isNoI18nBlockEnd(line)) {
      //     skip = false;
      //     return line;
      //   }

      //   return skip ? line : utility.replaceChineseWithTheVariable(line, i18n);
      // })
      .join("\n")
  );
}

module.exports = i18nLoader;
