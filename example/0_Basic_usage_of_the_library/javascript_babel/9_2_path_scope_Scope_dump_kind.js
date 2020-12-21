// 变量作用域 类型kind 
// 注意各种不同的函数声明方式导致的不同
// hoisted 提升，var 变量， local 内部
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

const jscode = `
function a(){return 2}
var b = function(){return 0}
var c = function x(){return 1}
var d = new Function("return 1");
var e = () => 1;
`;
let ast = parser.parse(jscode);
const visitor = {
    enter(path){
        if(path.isFunction()){
            console.log("\n此函数节点源码：\n", path.toString())
            console.log(path.scope.dump())
        }
    }
}

traverse(ast, visitor);
