// NodePath.inList()
// @return bool
// 是否在列表中/是否存在兄弟节点
// 一般只有那些能存放多个节点的节点才会将节点存放在列表中
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

const jscode = `function square(n) {
  var a = 1;
  a += 2;
  if(a + 1 == 4){return a-2}
  return a;
}`;

const ast = parser.parse(jscode);
const visitor = {
  Statement(path) {
    console.log('当前节点：', path.toString())
    console.log('当前语句', path.getStatementParent().toString())
    console.log('是否在列表中/是否存在兄弟节点', path.inList)
    console.log('---------------------------------')
  }
}

traverse(ast, visitor);