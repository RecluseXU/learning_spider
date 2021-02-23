// Scope.getBindingIdentifier(name)
// @return Node
// 获取指定的 Binding ，并通过这个 Binding 获取其定义的节点
// 这个方法通过 Scope.getBinding(name) 方法获取Binding
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
        console.log(n, '的定义：', path.scope.getBindingIdentifier(n))
    }
}

traverse(ast, visitor);
