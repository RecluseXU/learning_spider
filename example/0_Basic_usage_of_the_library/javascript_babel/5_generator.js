// 使用 generator 根据语法树生成代码
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;

const jscode = 'function squire(){var n = 3; return n*n;}';
let ast = parser.parse(jscode);

const visitor = {
  BinaryExpression(path) {// 寻找所有 计算节点 同时 操作是 乘
    if (path.node.operator == '*') {
      path.node.operator = '+';  // 将操作改为 加
    }
  }
}

traverse(ast, visitor);
console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
