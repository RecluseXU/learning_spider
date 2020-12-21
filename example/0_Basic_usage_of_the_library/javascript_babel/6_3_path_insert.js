// NodePath.insertAfter()用于在当前path前面插入节点
// NodePath.insertBefore()用于在当前path后面插入节点
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;

const jscode = `function square(n) {
  var a = 2;
}`;

const ast = parser.parse(jscode);
const visitor = {
  VariableDeclaration(path) {  // 找到变量声明节点，删除
    var node = t.NumericLiteral(1)  // 使用 types 来生成一个数字节点
    path.insertAfter(node)  // 在当前path前面插入节点
    node = t.NumericLiteral(3)
    path.insertBefore(node)  // 在当前path后面插入
  }
}

traverse(ast, visitor);
console.log(generator(ast)['code'])