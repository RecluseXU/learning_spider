// addComment(type, content, line)
// return None
// 添加注释
// 实际上只是调用 types.addComment 的方法而已
// 参数
// * type str 指定添加的注释方式，如果填入leading，则添加的注释会插入已有注释之前，否则在原有注释之后
// * content str 注释内容
// * line bool 插入行注释还是块注释
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;

const jscode = `
  var a = 1 + 9;
`;

const ast = parser.parse(jscode);
const visitor = {
  NumericLiteral(path) {
    console.log('当前节点源码:\n', path.toString());
    path.addComment('trailing', "注释", false);
  }
}

traverse(ast, visitor);
console.log(generator(ast)['code'])