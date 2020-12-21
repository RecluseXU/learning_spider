// 删除定义了，却从来没有使用过的函数
// 函数相对于变量来说，坑更多，因为它可以被当作变量使用，也可以调用自身
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;

const jscode = `
function squire(i){
  return i * i;
}
function i()
{
    function z(){return 6}
    var i = 123;
    i += 2;
    return 123;
}
i();
`;
let ast = parser.parse(jscode);
const visitor = {
    FunctionDeclaration(path)
    {
        const func_name = path.node.id.name;
        // 相对于对于变量，这里稍微有些复杂
        // 因为直接引用作用域的话，会引用到函数内部的作用域
        // 函数自己 并不在 它自己的作用域内，而在于其父作用域之中
        // 所以需要整一层父级作用域再获取
        const binding = path.scope.parent.getBinding(func_name);
        // 如果变量被修改过，则不能进行删除动作。
        if(binding && !binding.referenced){
            path.remove();
        }
    },
}


traverse(ast, visitor);
console.log(generator(ast)['code']);
