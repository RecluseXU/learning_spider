// 给节点添加属性
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;

const jscode = `function square(n) {
  var a;
}`;

const ast = parser.parse(jscode);
const visitor = {
  enter(path) {
    if(path.isIdentifier && path.node.name=='a'){
      path.node.init = 3
    }
  }
}

traverse(ast, visitor);
console.log(generator(ast)['code']);