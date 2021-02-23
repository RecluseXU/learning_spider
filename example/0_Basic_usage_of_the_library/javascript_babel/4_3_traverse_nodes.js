// 如果想要同时让两种不同类型的节点进入同一个函数，那么一起声明，用|隔开就好
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

var jscode = "var a = 1+2,b = ![];";

const visitor = {
    "BinaryExpression|UnaryExpression"(path){
        console.log(path.toString())
    }
}
let ast = parser.parse(jscode);
traverse(ast, visitor);
