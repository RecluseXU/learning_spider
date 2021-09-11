// 删除仅用于返回 window 对象的函数
const {BasePlug, types, parser, generator, traverse} = require("../base_plugs/base");

const visitor = {
    
    FunctionExpression(path){
        // 函数仅3句，变量声明, try-catch, return
        const {body} = path.node.body;
        if(body.length !== 3){return}
        if(!types.isVariableDeclaration(body[0])){return}
        if(!types.isTryStatement(body[1])){return}
        if(!types.isReturnStatement(body[2]) ){return}
        // exception语句仅一句
        const tryBody = body[1].handler.body.body;
        if(tryBody.length !== 1 || !types.isExpressionStatement(tryBody[0])){return}
        if(!types.isExpressionStatement(tryBody[0])){return}
        const {expression} = tryBody[0];
        if(!types.isAssignmentExpression(expression)){return}
        if(!types.isIdentifier(expression.right)){return}
        if(expression.right.name !== 'window'){return}
        // 函数为变量赋值
        let statementPath = path.getStatementParent();
        if(!types.isVariableDeclaration(statementPath)){return}
        // 赋值后不会更变
        let windowBinding = statementPath.scope.getBinding(statementPath.node.declarations[0].id.name);
        if(!windowBinding.constant){return}
        // 修改引用为 函数调用 为 window
        for(let refPath of windowBinding.referencePaths){
            while(!types.isCallExpression(refPath)){
                refPath = refPath.parentPath;
            }
            refPath.replaceWith(types.Identifier('window'))
        }
        windowBinding.path.remove()
    },
}

const plug = new BasePlug(
    'delete return window function',
    visitor,
    '删除仅用于返回 window 对象的函数',
)
exports.default = plug;


// function demo(){
//     var jscode = `
//     function f(){
//         var _0x5e38a2 = function () {
//             var _0x39cbff;

//             try {
//                 _0x39cbff = function () {
//                 return function () {}.constructor("return this")();
//                 }();
//             } catch (_0x184ef0) {
//                 _0x39cbff = window;
//             }

//             return _0x39cbff;
//         };
//         var a = _0x5e38a2();
//         return a;
//     }
//     `;
//     let ast = parser.parse(jscode);
//     plug.handler(ast)
//     console.log(generator(ast)['code']);
// }
// demo()
