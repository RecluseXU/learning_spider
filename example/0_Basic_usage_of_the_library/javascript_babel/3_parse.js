// 通过babel库将源代码解析成 AST 的 JSON结构的数据
// 不过这样做实在不怎么方便，建议还是直接用网页在线解析
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");

var jscode = "var a = 123;";

let ast = parser.parse(jscode);
console.log(JSON.stringify(ast, null, '\t'));
