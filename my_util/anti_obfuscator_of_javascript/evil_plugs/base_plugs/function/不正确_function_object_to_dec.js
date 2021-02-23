// 自调用函数TYPE1去除，函数体抽离到父级作用域中，删除函数
const _base = require('../base');
const t = _base.t
const parser = _base.parser
const BasePlug = require("../base").default;

const visitor = {
    CallExpression(path){
        if(!path.node.callee.name === 'Function'){return;}
        if(!path.node.arguments.length === 1){return;}
        if(!t.isStringLiteral(path.node.arguments[0])){return;}
        let func_body_str = path.node.arguments[0].value.replace('\\', '')
        let func_body = parser.parse(func_body_str, {'allowReturnOutsideFunction': true}).program.body[0]
        
        path.replaceInline(t.FunctionExpression(
            null,
            [],
            t.BlockStatement([func_body])
        ))
    }
}

exports.default = new BasePlug(
    'Function Object to normal function',
    visitor,
    '将使用Function(str)形式的函数转变未普通的 function(){}',
)


function demo() {
    const parser = _base.parser;
    const generator = _base.generator;
    var jscode = `
        var f = Function("return (function() {}.constructor('return this')( ));");
    `;
    let ast = parser.parse(jscode);
    let local_plug = new BasePlug(
        'Function Object to normal function',
        visitor,
        '将使用Function(str)形式的函数转变未普通的 function(){}',
    )
    local_plug.handler(ast)
    console.log('------------------')
    console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
}
demo()