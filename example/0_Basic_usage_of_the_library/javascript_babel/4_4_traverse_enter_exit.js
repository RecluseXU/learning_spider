// enter与exit
// 这是两种不同的遍历方式，默认情况下使用的是enter
// 区别主要在于，enters是由浅到深。exit是由深到浅
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

var jscode = `
var a = 'a' + 'b' + 'c' + d + 'e' + 'f';
`;

// enter
const visitor_enter = {
    "BinaryExpression"(path){
        console.log(path.toString())
    }
}

// exit
const visitor_exit = {
    "BinaryExpression": {
        exit: function(path) {
            console.log(path.toString())
        }
    },
}


console.log('Enter方式')
let ast = parser.parse(jscode);
traverse(ast, visitor_enter);
console.log('-----------------------------');
console.log('Exit方式')
traverse(ast, visitor_exit);
