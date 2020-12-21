// NodePath.get(str)用于获取子孙节点
// 如果想要获取更多层级的子孙，可以用'.'隔开进行获取
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

const jscode = `function square(n) {
  var a = 1;
  return 1 + 1;
}`;

const ast = parser.parse(jscode);
const visitor = {
  FunctionDeclaration(path) {  // 找到变量声明节点，删除
      var p1 = path.get('body')
      console.log('body 子节点源码:\n', p1.toString())
      var p2 = path.get('body.body.0')
      console.log('body.body.0 子节点源码:\n', p2.toString())
  }
}

traverse(ast, visitor);