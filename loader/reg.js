
// 提取冒号之间含中文的语句
exports.CHINESE_SENTENCE = /"([^"\u4e00-\u9fa5]*[\u4e00-\u9fa5]+[^"\u4e00-\u9fa5]*)+"/g;

exports.I18N_IGNORE = new RegExp(/i18nIgnore/g)

exports.NO_I18N_THIS_BLOCK_START = new RegExp(/noi18nthisblockstart/g)

exports.NO_I18N_THIS_BLOCK_END = new RegExp(/noi18nthisblockend/g)

// single line comment
exports.SING_LINE_COMMENT = new RegExp(/\/\//g)

// multi-line commnet start
exports.MULTI_LINE_COMMENT_START = new RegExp(/\/\*/g)

// multi-line commnet end
exports.MULTI_LINE_COMMENT_END = new RegExp(/\*\//g)