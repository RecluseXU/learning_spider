// Path.getFunctionParent(callback)
// @return NodePath | None
// 得到当前节点的第一个 父级/祖先 函数声明节点  
// 此函数会调用 `Path.findParent(callback)` 传入内置的判断是否为函数声明节点函数，并返回对应结果  


var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

var jscode = `
function f(){
    var b = 123;
    a = b + 1;
}`;

const visitor = {
    AssignmentExpression(path){
        console.log('当前路径源码:\n', path.toString());

        the_path = path.getFunctionParent()
        console.log('最终路径源码:\n', the_path.toString())
    }
}

let ast = parser.parse(jscode);
traverse(ast, visitor);
