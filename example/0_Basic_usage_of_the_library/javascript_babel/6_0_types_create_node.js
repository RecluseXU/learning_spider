// 利用 @babel/types 提供的类来直接创建节点，编写ast内容
// 节点类型非常多，一般而言，都是对照着AST在线解析的展示内容，查询得到需要的类型来创建
// 类型官方文档：https://babeljs.io/docs/en/babel-types
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const generator = require(js_env +"@babel/generator").default;


var callee = t.memberExpression(t.identifier('console'), t.identifier('log')),
    args = [t.NumericLiteral(666)],
    call_exp = t.callExpression(callee, args),
    exp_statement = t.ExpressionStatement(call_exp)

    
console.log(generator(exp_statement)['code'])