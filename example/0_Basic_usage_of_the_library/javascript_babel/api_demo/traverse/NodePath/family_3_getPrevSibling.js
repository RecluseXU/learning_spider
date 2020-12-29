// NodePath.getPrevSibling()获取同级前一个节点的NodePath
// @return Node
// 此函数源码就一句 return this.getSibling(this.key - 1);

var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

const jscode = `
  var a = 1 + 9;
  a = a + a;
  console.log(a);
  console.log(b);
`;

const ast = parser.parse(jscode);
const visitor = {
  ExpressionStatement(path) {
    console.log('当前节点源码:\n', path.toString())
    console.log('同级前一个节点源码:\n', path.getPrevSibling().toString())
    console.log('----------------')
  }
}

traverse(ast, visitor);