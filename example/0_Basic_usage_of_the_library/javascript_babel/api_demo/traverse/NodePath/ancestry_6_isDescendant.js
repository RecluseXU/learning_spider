// Path.isDescendant(path)
// @return bool
// 当前 Path 是否是指定 Path 的后代
// 这个方法是调用 Path.findParent 来进行判断的
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

var jscode = `
function f2(){
    var b = 123;
    a = b + 1;
}`;

const visitor = {
    AssignmentExpression(path){
        console.log('当前路径源码:\n', path.toString());
        console.log('儿子是爸爸的后代：', path.isDescendant(path.parentPath))
        console.log('儿子是爷爷的后代：', path.isDescendant(path.parentPath.parentPath))
        console.log('儿子是孙子的后代：', path.isDescendant(path.get('left')))
    }
}

let ast = parser.parse(jscode);
traverse(ast, visitor);