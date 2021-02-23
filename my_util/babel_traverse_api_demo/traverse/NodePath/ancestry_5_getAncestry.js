// Path.getAncestry()
// @return NodePath
// 返回所有 父级/祖先 的Path，@return Array
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;

var jscode = `
function f2(){
    var b = 123;
    a = b + 1;
}`;

const visitor = {
    AssignmentExpression(path){
        console.log('当前路径源码:\n', path.toString());
        the_paths = path.getAncestry()

        console.log('返回类型:\n', the_paths instanceof Array)
        console.log('结果路径源码:\n', the_paths.join('\n\n'))
    }
}

let ast = parser.parse(jscode);
traverse(ast, visitor);

