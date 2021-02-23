// getSibling(key)
// @NodePath
// 通过父级，获取同级节点的 NodePath 或 其它内容
// * 如果传入数字，则尝试获取 同级节点 指定位置的 NodePath
// * 如果传入数字，则尝试获取 父级节点 指定位置的 NodePath
// * 也可以传入一些特殊的key, 获取一些特殊的内容可以使用 NodePath.listKey属性 查看
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

const jscode = `
function x(){
  console.log('code 1');
  console.log('code 2');
  var a = 1;
  console.log('code 3');
  console.log('code 4');
}
`;

const ast = parser.parse(jscode);
const visitor = {
  VariableDeclaration(path) {
    console.log('当前节点源码:\n', path.toString());
    console.log('---------------------------------------------');
    console.log('第1个兄弟的源码', path.getSibling(0).toString());
    console.log('第2个兄弟的源码', path.getSibling(1).toString());
    console.log('第3个兄弟的源码', path.getSibling(2).toString());
    console.log('第4个兄弟的源码', path.getSibling(3).toString());
    console.log('第5个兄弟的源码', path.getSibling(4).toString());
    console.log(path.listKey)
    console.log('---------------------------------------------');
  }
}

traverse(ast, visitor);