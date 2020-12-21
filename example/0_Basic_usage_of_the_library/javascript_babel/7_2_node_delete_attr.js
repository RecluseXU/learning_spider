// 删除节点属性
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;

const jscode = `function square(n) {
  var a = 1;
}`;

const ast = parser.parse(jscode);
const visitor = {
  VariableDeclarator(path) {
    // 删除初始值
    // 虽然看上去是删除属性，但其实这个属性的值是一个 NumericLiteral 节点，并非普通的数值
    // 这里相当于给AST剪枝了
    delete path.node.init;  
  }
}

traverse(ast, visitor);
console.log(generator(ast)['code']);