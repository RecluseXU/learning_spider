// NodePath.getAllPrevSiblings()
// @return Array
// 获取当前节点前的兄弟节点的NodePath，结果存放在一个数组中返回  


var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

const jscode = `
  var a = 1 + 9;
  a = a + a;
  console.log(a);
  console.log(b);
`;

const ast = parser.parse(jscode);
const visitor = {
  ExpressionStatement(path) {
    console.log('当前节点源码:\n', path.toString())
    const next_nodepath = path.getAllNextSiblings()
    console.log('后面的兄弟节点源码:')
    for(var nodepath of next_nodepath){
      console.log(nodepath.toString())
    }
    console.log('----------------')
  }
}

traverse(ast, visitor);