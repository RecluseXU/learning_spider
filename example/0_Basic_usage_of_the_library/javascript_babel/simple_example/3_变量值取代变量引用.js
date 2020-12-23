// 通过观察变量引用，得知变量的引用信息
// 用变量的初始值取代引用变量的位置，删除没必要的声明的变量
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;

const jscode = `
var z = 2
function i(x, y)
{
    var x = 222;
    ++x;
    return x + y
}
i(z, 4);
`;
let ast = parser.parse(jscode);
const visitor = {
    VariableDeclarator(path){  // 还原var、let、const 定义的变量
        const {id, init} = path.node;
        if (!t.isLiteral(init)) return;  // 只处理字面量

        const binding = path.scope.getBinding(id.name);
        if (!binding)return;
        if(binding.constantViolations.length != 0)return;  // 如果该变量的值被修改则不处理
            
        for (const refer_path of binding.referencePaths) {  // 遍历所有引用变量的路径
            refer_path.replaceWith(init);  // 用变量的初始值来取代引用位置的变量名
        }
        path.remove(); // 移除变量声明
    },
}


traverse(ast, visitor);
console.log('----------------------------------')
console.log(generator(ast)['code']);
