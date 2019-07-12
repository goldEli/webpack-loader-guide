var assert = require("assert");
var REG = require("../loader/reg");

describe("Regular Expresstion", function() {

  describe("提取双引号的中文(一行中多个)", function() {
    const test = [
      {
        str: 'var test = {1: "这个区域忽略国际化", 2: "请不要国际化我"}',
        result:  ['"这个区域忽略国际化"', '"请不要国际化我"']
      },
    ]
    test.forEach(t => {
      it(t.str, function() {
        assert.equal(t.str.match(REG.CHINESE_SENTENCE)[0], t.result[0]);
        assert.equal(t.str.match(REG.CHINESE_SENTENCE)[1], t.result[1]);
      });
    })
  })

  describe("提取双引号的中文", function() {
    const test = [
      {
        str: 'asdfasdf"中文"asdf',
        result:  '"中文"'
      },
      {
        str: 'asdfasdf"中12文"asdf',
        result:  '"中12文"'
      },
      {
        str: 'asdfasdf"中12、。文"asdf',
        result:  '"中12、。文"'
      },
      {
        str: 'asdfasdf"sdf(中12、。文f"asdf',
        result:  '"sdf(中12、。文f"'
      },
    ]
    test.forEach(t => {
      it(t.str, function() {
        assert.equal(t.str.match(REG.CHINESE_SENTENCE)[0], t.result);
      });
    })
  })

  describe('"判断字符串中是否包含"i18nIgnore"', function() {
    const test = [
      {
        str: 'i18nIgnore',
        result:  'i18nIgnore'
      },
      {
        str: '// i18nIgnore',
        result:  'i18nIgnore'
      },
      {
        str: `
        // i18nIgnore
const Confirm = require("prompt-confirm")

const u = require("./utility")
const createIndexHtml = require("./createIndexHtml")
const path = require("path")
const rootPath = __dirname.replace("/script", "")
const client = require("scp2")
        `,
        result:  'i18nIgnore'
      },
    ]
    test.forEach(t => {
      it(t.str, function() {
        assert.equal(t.str.match(REG.I18N_IGNORE)[0], t.result);
      });
    })
  })

  describe('"判断字符串中是否包含忽略国际化块开头"noi18nthisblockstart"', function() {
    const test = [
      {
        str: 'noi18nthisblockstart',
        result:  'noi18nthisblockstart'
      },
      {
        str: '// noi18nthisblockstart',
        result:  'noi18nthisblockstart'
      }
    ]
    test.forEach(t => {
      it(t.str, function() {
        assert.equal(t.str.match(REG.NO_I18N_THIS_BLOCK_START)[0], t.result);
      });
    })
  })

  describe('"判断字符串中是否包含忽略国际化块结束"noi18nthisblockend"', function() {
    const test = [
      {
        str: 'noi18nthisblockend',
        result:  'noi18nthisblockend'
      },
      {
        str: '// noi18nthisblockend',
        result:  'noi18nthisblockend'
      }
    ]
    test.forEach(t => {
      it(t.str, function() {
        assert.equal(t.str.match(REG.NO_I18N_THIS_BLOCK_END)[0], t.result);
      });
    })
  })

  describe('"判断字符串中是否包含单行注释"// this is a comment"', function() {
    const test = [
      {
        str: ' //',
        result:  '//'
      },
      {
        str: ' // noi18nthisblock //',
        result:  '//'
      }
    ]
    test.forEach(t => {
      it(t.str, function() {
        assert.equal(t.str.match(REG.SING_LINE_COMMENT)[0], t.result);
      });
    })
  })

  describe('"判断字符串中是否包含多行注释开头"/*"', function() {
    const test = [
      {
        str: ' /* ',
        result:  '/*'
      },
      {
        str: '/** */',
        result:  '/*'
      }
    ]
    test.forEach(t => {
      it(t.str, function() {
        assert.equal(t.str.match(REG.MULTI_LINE_COMMENT_START)[0], t.result);
      });
    })
  })

  describe('"判断字符串中是否包含多行注释结束"*/"', function() {
    const test = [
      {
        str: ' */ ',
        result:  '*/'
      },
      {
        str: '/** */',
        result:  '*/'
      }
    ]
    test.forEach(t => {
      it(t.str, function() {
        assert.equal(t.str.match(REG.MULTI_LINE_COMMENT_END)[0], t.result);
      });
    })
  })

});
