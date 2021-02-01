// m? a=9:a=0; => if (m) a = 9;else a = 0;
// 1.判断特征，过滤掉一些不能转换的条件表达式，比如 嵌套的三目表达式有时候是不行的，还有m = a?b:c，这种也无法一步就转换成if语句。
// 2.构造一个 IfStatement 类型的节点
// 3.test 节点可用直接用
// 4.如果consequent  不是 ExpressionStatement 类型的节点，可以先将其转换为了ExpressionStatement 的节点，同理 alternate  也是
// 5.替换即可

var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env + "@babel/generator").default;

const jscode = `
m? a=9:a=0;
`;
let ast = parser.parse(jscode);


const visitor = {
    ConditionalExpression(path){            
        let parentPath = path.parentPath;
        if (parentPath.isAssignmentExpression() ||　parentPath.isConditionalExpression()){return;}

        let {test, consequent, alternate} = path.node;
        if (!t.isExpressionStatement(consequent)){consequent = t.ExpressionStatement(consequent);}
        if (!t.isExpressionStatement(alternate)){alternate = t.ExpressionStatement(alternate);}
        parentPath.replaceInline(t.IfStatement(test, consequent, alternate));
    },
}

traverse(ast, visitor);
console.log('----------------------------');
console.log(generator(ast)['code']);