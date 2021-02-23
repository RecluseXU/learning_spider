// Scope.hasOwnBinding(name)
// @return bool
// 获知当前作用域是否有某个被绑定变量
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
        console.log('当前作用域有 被绑定变量 z:', path.scope.hasOwnBinding('z'))
        console.log('当前作用域有 被绑定变量 g:', path.scope.hasOwnBinding('g'))
    }
}

traverse(ast, visitor);
