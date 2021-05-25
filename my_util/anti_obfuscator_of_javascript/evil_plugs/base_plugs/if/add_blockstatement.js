// 如果控制流语句主体没有{}，那么加上
const _base = require('../base');
const t = _base.t
const BasePlug = require("../base").default;
const visitor = {
    IfStatement(path) {
        // 处理if内语句
        let consequentPath = path.get('consequent');
        if (!t.isBlockStatement(consequentPath)) {
            consequentPath.replaceWith(t.BlockStatement([consequentPath.node]))
        }
        // 处理else内语句
        let alternatePath = path.get('alternate');
        if (!t.isBlockStatement(alternatePath)) {
            alternatePath.replaceWith(t.BlockStatement([alternatePath.node]))
        }
    }
}

exports.default = new BasePlug(
    'IfStatement consequent transform into BlockStatement',
    visitor,
    'if 语句体是单语句且无括号括起来时添加括号',
)


code_demos = [
    `
        var i = 0;
        if(i < 1) i += 1;
        else i -= 1;
    `,
    `
        var i = 0;
        if(i < 1){i += 1;}
        else{ i -= 1;}
    `
]

function demo() {
    const parser = _base.parser;
    const generator = _base.generator;
    let local_plug = new BasePlug(
        'IfStatement consequent transform into BlockStatement',
        visitor,
        'if 语句体是单语句且无括号括起来时添加括号',
    )
    for (jscode of code_demos) {
        let ast = parser.parse(jscode);
        local_plug.handler(ast)
        console.log(generator(ast)['code']);
    }
}
demo()