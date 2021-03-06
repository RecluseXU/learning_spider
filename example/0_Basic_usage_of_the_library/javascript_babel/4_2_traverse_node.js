// 通过代码遍历，使用path来进行各种路径操作
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

var jscode = "var a = 123;";

const visitor = {
    // 每当遇到 VariableDeclaration 类型节点，都会进入此处，并将对应NodePath传入以供操作 
    VariableDeclaration(path)
    {
        console.log('当前路径 源码:\n', path.toString());
        console.log('当前路径 节点:\n', path.node.toString())
        console.log('当前路径 父级节点:\n', path.parent.toString());
        console.log('当前路径 父级路径:\n', path.parentPath.toString())
        console.log('当前路径 类型:\n', path.type)
    }
}
let ast = parser.parse(jscode);
traverse(ast, visitor);
