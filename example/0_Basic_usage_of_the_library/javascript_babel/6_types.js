// 替换节点内容
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;

const jscode = `function square(n) {
  return 1 + 1;
}`;

const ast = parser.parse(jscode);
const visitor = {
  enter(path) {
    if (path.node.type === "BinaryExpression" && path.node.operator === '+') {
      // path.replaceWith({type:"NumericLiteral",value:3});  // 自己生成节点 来替换
      path.replaceWith(t.NumericLiteral(2));  // 使用types来生成 来替换
      console.log(generator(ast)['code'])  // 使用generator得到修改节点后的代码
    }
  }
}

traverse(ast, visitor);