// 自调用函数TYPE1去除，函数体抽离到父级作用域中，删除函数
const _base = require('../base');
const t = _base.t
const BasePlug = require("../base").default;
const visitor = {
    UnaryExpression(path) {
        let { operator, argument } = path.node;
        if (operator != "!" || !t.isCallExpression(argument)) return;
        let { arguments, callee } = argument;
        if (arguments.length != 0 || !t.isFunctionExpression(callee)) return;

        let { id, params, body } = callee;
        if (id != null || params.length != 0 || !t.isBlockStatement(body)) return;
        path.replaceWithMultiple(body.body);
    }
}

exports.default = new BasePlug(
    'IIFE body extract to ParentNode body',
    visitor,
    '自调用函数函数去除，函数体抽离到父级作用域中，删除函数',
)


function demo() {
    const parser = _base.parser;
    const generator = _base.generator;
    var jscode = `
        !function (){
            console.log('what');
        }();

        (function (){
            console.log('Well');
        })();
    `;
    let ast = parser.parse(jscode);
    let local_plug = new BasePlug(
        'IIFE body extract to ParentNode body',
        visitor,
        '自调用函数函数去除，函数体抽离到父级作用域中，删除函数',
    )
    local_plug.handler(ast)
    console.log('------------------')
    console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
}
demo()