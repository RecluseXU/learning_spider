/*
    将while 转化为for
*/
const _base = require('../base');
const t = _base.t
const BasePlug = require("../base").default;


const visitor = {
    "DoWhileStatement|WhileStatement"(path) {
        if (!types.isBlockStatement(path.node.body)) {
            console.error('发现循环体并非 BlockStatement，退出')
            return;
        }
        if (types.isDoWhileStatement(path)) {
            // dowhile 需要处理一遍代码到循环外
            let isHaveBreakstatement = false
            path.get('body').traverse({ BreakStatement() { isHaveBreakstatement = true } })
            if (isHaveBreakstatement) {
                console.error('发现有break语句存在于do代码块中，退出')
                return;
            } else {
                // do中的代码插入父级末尾
                for (nodePath of path.get('body.body')) { path.insertBefore(nodePath.node); }
            }
        }
        path.replaceInline(types.forStatement(null, path.node.test, null, path.node.body))
    }
}

exports.default = new BasePlug(
    'WhileStatement transform into ForStatement',
    visitor,
    '将 非for循环 转换为 for循环',
)


function demo() {
    const parser = _base.parser;
    const generator = _base.generator;
    var jscode = `
        var i = 0;
        for(; i<10; i++) i += 1;

        while(i<1) i += 1;

        if(i < 1) i += 1;
    `;
    let ast = parser.parse(jscode);
    let local_plug = new BasePlug(
        'WhileStatement transform into ForStatement',
        visitor,
        '将while循环 转化为for循环'
    )
    local_plug.handler(ast)
    console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
}
demo()