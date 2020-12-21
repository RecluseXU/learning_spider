// 删除定义了，却从来没有使用过的变量
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;

const jscode = `
var a = 1;
var b = 2;
function squire(){
  var c = 3;
  var d = 4;
  return a * d;
  var e = 5;
}
var f = 6;
`;
let ast = parser.parse(jscode);
const visitor = {
    VariableDeclarator(path)
    {
        const func_name = path.node.id.name;
        const binding = path.scope.getBinding(func_name);
        // 如果变量没有被引用过，那么删除也没关系
        //   此处不能用有无修改过进行判断，因为没有被修改过并不意味着没用
        if(binding && !binding.referenced){
            path.remove();
        }
    },
}


traverse(ast, visitor);
console.log(generator(ast)['code']);
