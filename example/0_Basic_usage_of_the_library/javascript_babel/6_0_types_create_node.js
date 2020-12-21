// 利用 @babel/types 提供的类来直接创建节点，编写ast内容
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const generator = require(js_env +"@babel/generator").default;


var callee = t.memberExpression(t.identifier('console'), t.identifier('log')),
    args = [t.NumericLiteral(666)],
    call_exp = t.callExpression(callee, args),
    exp_statement = t.ExpressionStatement(call_exp)
console.log(generator(exp_statement)['code'])