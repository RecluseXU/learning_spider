/*
    将while 转化为for
*/
const _base = require('../base');
const t = _base.t
const BasePlug = require("../base").default;

const visitor = {
    WhileStatement(path){
        path.replaceInline(t.forStatement(null, path.node.test, null, path.node.body))
    },
}

exports.default = new BasePlug(
    'WhileStatement transform into ForStatement',
    visitor,
    '将 while循环 转换为 for循环',
)


function demo(){
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