// options-retainLines 尝试在输出代码中使用与源代码中相同的行号
// 如果觉得上面的描述难理解，你也可以简单理解为，删除空的行，只保留有代码的行
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const generator = require(js_env +"@babel/generator").default;

const jscode = `

function squire(){

  return 2 * 2;

}`;
let ast = parser.parse(jscode);

console.log(generator(ast, {'retainLines':false})['code']);
