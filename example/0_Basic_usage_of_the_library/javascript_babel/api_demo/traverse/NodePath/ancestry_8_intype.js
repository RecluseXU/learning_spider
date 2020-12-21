// Path.inType(**NodeType_str)
// Path对应节点，或其 父/祖先 节点 是否包含特定类型的节点
// 可以一次性传入多个类型，只要有一个符合就会返回 true, 否则返回 false  

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
        _is = path.inType('FunctionDeclaration')
        console.log('父级或自身包含函数声明节点：', _is);
        _is = path.inType('WithStatement', 'DebuggerStatement')
        console.log('父级或自身包含 with 或 debugger：', path.inType(_is));
    }
}

let ast = parser.parse(jscode);
traverse(ast, visitor);
