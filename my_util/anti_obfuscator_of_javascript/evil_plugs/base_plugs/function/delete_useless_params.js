// 自调用函数TYPE1去除，函数体抽离到父级作用域中，删除函数
const _base = require('../base');
const t = _base.t
const BasePlug = require("../base").default;
const visitor = {
    "FunctionDeclaration|FunctionExpression"(path) {
        for(let binding of Object.values(path.scope.bindings)){
            if(binding.kind !== 'param'){continue;}
            if(binding.referenced){continue;}
            delete binding.path.remove()
        }
    }
}

exports.default = new BasePlug(
    'Delete useless function params',
    visitor,
    '删除未使用的函数参数',
)


function demo() {
    const parser = _base.parser;
    const generator = _base.generator;
    var jscode = `
        function f(a, b){return a}
        var f2 = function(x, y){return x}
    `;
    let ast = parser.parse(jscode);
    let local_plug = new BasePlug(
        'Delete useless function params',
        visitor,
        '删除未使用的函数参数', 
    )
    local_plug.handler(ast)
    console.log('------------------')
    console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
}
demo()