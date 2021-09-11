// 将使用Function(str)形式的函数转变未普通的 function(){}
const {BasePlug, types, parser, generator, traverse} = require("../base");

const visitor = {
    CallExpression(path){
        // Function(str, ...... , str)判定
        let {node} = path;
        if(node.callee.name !== 'Function'){return;}
        for(argument of node.arguments){
            if(!types.isStringLiteral(argument)){return;}
        }
        
        // 转换
        let arguments = node.arguments.map((argument) => {
            return argument.value.replace('\\', '');
        })
        const funcBodyStr = arguments.pop(),
              funcArguments = arguments.join(', ');
        path.replaceWithSourceString('function(' + funcArguments + '){' + funcBodyStr + '}');
    }
}

plug = new BasePlug(
    'Function Object to normal function',
    visitor,
    '将使用Function(str)形式的函数转变未普通的 function(){}',
);
exports.default = plug;


// function demo() {
//     var jscode = `
//         var f = Function("return (function() {}.constructor('return this')( ));");
//         var f2 = Function("x", "y", "return x+y;")
//     `;
//     let ast = parser.parse(jscode);
//     let local_plug = new BasePlug(
//         'Function Object to normal function',
//         visitor,
//         '将使用Function(str)形式的函数转变未普通的 function(){}',
//     )
//     local_plug.handler(ast)
//     console.log('------------------')
//     console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
// }
// demo()