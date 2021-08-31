// 删除未使用的函数参数
const {BasePlug, types, parser, generator, traverse} = require("../base");

const visitor = {
    "FunctionDeclaration|FunctionExpression"(path) {
        for(let binding of Object.values(path.scope.bindings)){
            if(binding.kind !== 'param'){continue;}
            if(binding.referenced){continue;}
            delete binding.path.remove()
        }
    }
}

const plug = new BasePlug(
    'Delete useless function params',
    visitor,
    '删除未使用的函数参数',
);
exports.default = plug;


function demo() {
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