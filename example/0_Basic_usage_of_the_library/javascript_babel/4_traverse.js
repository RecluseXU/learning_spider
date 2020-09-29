// 通过代码遍历，使用path来进行各种路径操作
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

var jscode = "var a = 123;";

const visitor = {
    // 这里的VariableDeclaration就是截图里面所标的，表示只要是这个路径，都会进来并进行如下操作。
    VariableDeclaration(path)
    {
        console.log('当前路径类型', path.type); // 打印当前路径类型
        console.log('当前路径源码：', path.toString()); // 打印当前路径所对应的源代码
    }
}
let ast = parser.parse(jscode);
traverse(ast, visitor);
