// NodePath.traverse 方法用于 遍历当前Path对应节点的子节点
// 与 @babel/traverse.default(ast, visitor); 用法一致，完全可以当成套娃使用
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;

const jscode = `function square(n) {
  var b = 1;
  var a = 2;
  return a + b;
}`;

const ast = parser.parse(jscode);

const sub_visitor = {  // 删除节点
  VariableDeclaration(path){path.remove()}
}
const visitor = {
  BlockStatement(path) {  // 找到变量声明节点，删除
    path.traverse(sub_visitor);
  }
}

traverse(ast, visitor);
console.log(generator(ast)['code'])