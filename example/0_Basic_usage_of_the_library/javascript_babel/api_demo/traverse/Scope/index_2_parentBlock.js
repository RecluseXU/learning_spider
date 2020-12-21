// Scope.parentBlock(name)
// @return Node
// 获取 作用域路径 的父级
// 它的源码就一句 this.path.parent;
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

const jscode = `
var g = 1;
function a(){return g;}
function b(){var z=2; return z;}
`;
let ast = parser.parse(jscode);
const visitor = {
    ReturnStatement(path){
        var n = path.node.argument.name
        console.log("\n这里是", path.toString())
        console.log('结果：', path.scope.parentBlock)
    }
}

traverse(ast, visitor);
