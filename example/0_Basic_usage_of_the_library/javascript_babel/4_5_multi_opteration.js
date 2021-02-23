// 对同一个节点进行多种已定义的操作
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const generator = require(js_env +"@babel/generator").default;
const traverse = require(js_env + "@babel/traverse").default;

var jscode = `
var a = 'a';
`;

function add_b(path){
    path.node.value = path.node.value + 'b'
}
function add_c(path){
    path.node.value = path.node.value + 'c'
}


const visitor_enter = {
    "StringLiteral":{
        enter:[add_b, add_c]
    }
}


let ast = parser.parse(jscode);
traverse(ast, visitor_enter);
console.log(generator(ast)['code']);
