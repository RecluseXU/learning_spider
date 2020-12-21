// NodePath.evaluate()用于计算当前path对应节点的计算结果（如果可以计算的话）
// 如果有计算结果，就用计算结果生成节点来替换原本的节点
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;


const jscode = `function square(n) {
  var a = 1;
  return 1 + 1;
}`;

const ast = parser.parse(jscode);
const visitor = {
  "Identifier|BinaryExpression"(path)
  {
      const {confident, value} = path.evaluate();
      confident && path.replaceInline(t.valueToNode(value));
  },
}

traverse(ast, visitor);
console.log(generator(ast)['code'])