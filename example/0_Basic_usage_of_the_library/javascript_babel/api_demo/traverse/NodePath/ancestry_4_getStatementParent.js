// Path.getStatementParent()
// @return NodePath | None
// 返回第一个 父级/祖先 声明节点  
// 声明节点所包含的节点类型见：https://github.com/babel/babylon/blob/master/ast/spec.md#blockstatement

var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

var jscode = `
function f2(){
    var b = 123;
    a = b + 1;
}`;

const visitor = {
    BinaryExpression(path){
        console.log('当前路径源码:\n', path.toString());
        the_path = path.getStatementParent()
        console.log('最终路径源码:\n', the_path.toString())
    }
}

let ast = parser.parse(jscode);
traverse(ast, visitor);
