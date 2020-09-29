// 修改节点内容
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;

const jscode = 'function squire(){var n = 3; n=n+2; return n*n;}';
let ast = parser.parse(jscode);

const visitor = {
  enter(path) {
    // 寻找所有 计算节点 同时 操作是乘
    if (path.node.type === "BinaryExpression" && path.node.operator == '*') {
      path.node.operator = '+';  // 将操作改为加
      path.node.left.name = 'x';  // 将左边的变量改为x
      console.log(generator(ast)['code'])  // 使用generator得到修改节点后的代码
    }
    // 寻找 右操作的值是一个数字节点 的 表达式 
    else if(path.node.type === 'ExpressionStatement' && path.node.expression.right.right.type == 'NumericLiteral'){
      path.remove();  // 删除路径下的东西
    }
  }
}

var a = traverse(ast, visitor);
