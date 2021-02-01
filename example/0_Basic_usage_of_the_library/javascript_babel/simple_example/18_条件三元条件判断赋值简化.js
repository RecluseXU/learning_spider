// 把 a = m?11:22; 转成 m ? a = 11 : a = 22;
// 1.节点类型变了，由 AssignmentExpression 类型变成了ConditionalExpression 类型
// 2.ConditionalExpression 子节点的 consequent 和 alternate 都变成了 AssignmentExpression 类型

var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env + "@babel/generator").default;

const jscode = `
a = m? 11:22;
`;
let ast = parser.parse(jscode);


const visitor = {
    ExpressionStatement(path){
        let {left, right} = path.node.expression;
        if(!t.isIdentifier(left) | !t.isConditionalExpression(right)){return;}
        let {consequent, alternate} = right
        path.node.expression.right.consequent = t.AssignmentExpression('=', left, consequent)
        path.node.expression.right.alternate = t.AssignmentExpression('=', left, alternate)
        path.node.expression = path.node.expression.right
    }
}

traverse(ast, visitor);
console.log('----------------------------');
console.log(generator(ast)['code']);