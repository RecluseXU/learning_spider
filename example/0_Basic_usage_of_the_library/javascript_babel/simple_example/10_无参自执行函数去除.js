// 将那些声明字面量参数 作为变量写入到函数体内，以压缩代码
// 形式:
//   (function(a){})('a')
//    变为
//   (function(){var a='a'})()

var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env + "@babel/generator").default;

const jscode = `
!function() {
  a = 123;
}();
`;
let ast = parser.parse(jscode);


const visitor = {

  UnaryExpression(path) {
      const {operator, argument} = path.node;
      if (operator !== "!" || !t.isCallExpression(argument))
          return;
      let {callee, arguments} = argument;
      if (!t.isFunctionExpression(callee) || arguments.length !== 0)
          return;
      path.replaceInline(callee.body.body);
  },
}
traverse(ast, visitor);
console.log('----------------------------');
console.log(generator(ast)['code']);