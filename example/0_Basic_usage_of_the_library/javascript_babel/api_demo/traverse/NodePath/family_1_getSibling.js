// 获取兄弟节点
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;

const jscode = `
  var a = 1 + 9;
`;

const ast = parser.parse(jscode);
const visitor = {
  NumericLiteral(path) {
    console.log('当前节点源码:\n', path.toString())
    console.log('兄弟节点源码:\n', path.getOpposite().toString())
    console.log('----------------')
  }
}

traverse(ast, visitor);