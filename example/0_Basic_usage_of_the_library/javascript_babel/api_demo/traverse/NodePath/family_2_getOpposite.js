// 获取相对的节点
// 这个是根据 left 与 right 属性来的

var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

const jscode = `
  var a = 1 + 9;
`;

const ast = parser.parse(jscode);
const visitor = {
  NumericLiteral(path) {
    console.log('当前节点源码:\n', path.toString())
    console.log('对应节点源码:\n', path.getOpposite().toString())
    console.log('----------------')
  }
}

traverse(ast, visitor);