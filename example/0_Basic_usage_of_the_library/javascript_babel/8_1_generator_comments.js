// 代码生成过程中 取消注释
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const generator = require(js_env +"@babel/generator").default;

const jscode = `
// 我是注释
function squire(){ // 我也是注释
  return 2 * 2;  // 我还是注释
}`;
let ast = parser.parse(jscode);

console.log(generator(ast, {'comments':false})['code']);
