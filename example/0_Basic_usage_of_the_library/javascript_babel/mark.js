// 如果函数只有一个语句，那么把函数的括号去掉
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;

var jscode = `
for(let i=0; i<10; i++){
	console.log("hello world");
}`;

const visitor = {
    BlockStatement(path){
        if(path.get('body').length == 1){
            path.replaceWith(path.get('body').pop())
        }
    }
}

let ast = parser.parse(jscode);
traverse(ast, visitor);
console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码