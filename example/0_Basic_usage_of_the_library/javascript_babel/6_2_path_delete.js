// NodePath.remove()用于删除路径对应的节点
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;

const jscode = `function square(n) {
  var a = 1;
  ;
  ;
  return 1 + 1;
}`;

const ast = parser.parse(jscode);
const visitor = {
  VariableDeclaration(path){  // 找到变量声明节点，删除
    path.remove();
  },
  EmptyStatement(path){  // 只有一个;的情况也会别认为是正常的EmptyStatement节点，此处也删除
    path.remove();
  },
}

traverse(ast, visitor);
console.log(generator(ast)['code'])