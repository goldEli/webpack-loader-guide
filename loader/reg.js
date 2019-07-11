
// 提取冒号之间含中文的语句
exports.CHINESE_SENTENCE = /"([^"\u4e00-\u9fa5]*[\u4e00-\u9fa5]+[^"\u4e00-\u9fa5]*)+"/g;

exports.I18N_IGNORE = new RegExp(/i18nIgnore/g)

exports.NO_I18N_THIS_BLOCK = new RegExp(/noi18nthisblock/g)

