// 获取相对的节点
// @return Node
// 此函数通过调用 NodePath.getSibling(key) , 传入 当前节点为 left 或 right 实现

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