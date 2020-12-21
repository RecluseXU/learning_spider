// Scope.getOwnBindingIdentifier(name)
// @return Node|void 0
// 获取指定的 Binding ，并通过这个 Binding 获取其定义的节点
// 不同于 Scope.getBindingIdentifier ，这个方法只关注当前作用域，并不会向上寻找
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
        console.log(n, '的定义：', path.scope.getOwnBindingIdentifier(n))
    }
}

traverse(ast, visitor);
