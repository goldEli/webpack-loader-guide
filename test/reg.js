var assert = require("assert");
var REG = require("../loader/reg");

describe("Regular Expresstion", function() {

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

  describe('"判断字符串中是否包含"noi18nthisblock"', function() {
    const test = [
      {
        str: 'noi18nthisblock',
        result:  'noi18nthisblock'
      },
      {
        str: '// noi18nthisblock',
        result:  'noi18nthisblock'
      }
    ]
    test.forEach(t => {
      it(t.str, function() {
        assert.equal(t.str.match(REG.NO_I18N_THIS_BLOCK)[0], t.result);
      });
    })
  })

});
