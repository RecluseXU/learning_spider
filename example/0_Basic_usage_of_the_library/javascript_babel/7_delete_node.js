// 替换节点内容
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
  enter(path) {
    if (path.node.type === "VariableDeclarator") {
      delete path.node.init;  // 删除初始值
      console.log(generator(ast)['code'])
    }
  }
}

traverse(ast, visitor);