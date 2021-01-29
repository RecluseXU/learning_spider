// NodePath.replaceWithMultiple(nodes)
// 方法用于将传入的 Node 多个替换对应 NodePath 的 Node
// 此方法能用多个节点替换一个节点
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;

const jscode = `function square(n) {
  return n + 1;
}`;

const ast = parser.parse(jscode);
const visitor = {
  ReturnStatement(path) {
    let nodes = [
      t.expressionStatement(t.stringLiteral("who")),
      t.expressionStatement(t.stringLiteral("I")),
      t.expressionStatement(t.stringLiteral("am")),
    ]
    path.replaceWithMultiple(nodes);
  }
}

traverse(ast, visitor);
console.log(generator(ast)['code'])