// 和节点作用域相关的内容被定义在了 Scope类 中
// 这个类的定义位于 @babel/traverse/lib/scope/index.js 中
// 这里会输出一些属性，这些并不重要，知道就行
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

const jscode = `
var g = 1;
function squire(i){
    return i * g * i;
}
function i()
{
    var i = 123;
    i += 2;
    return 123;
}
`;
let ast = parser.parse(jscode);
const visitor = {
    VariableDeclaration(path){
        console.log("\n这里是", path.toString())
        console.log('--------------------------------')
        sc = path.scope  // 获取对应的 Scope对象
        console.log('是否已经初始化:', sc.inited)  // 是否已经初始化标识，在执行init()后被设置为true
        console.log('uid 属性', sc.uid)
        console.log('cached 属性', sc.cached)
        console.log('node 属性', sc.node)
        console.log('block 属性', sc.block)  // 猜测是 所属作用域
        console.log('path 属性', sc.path.node == sc.block)  // 猜测是 所属作用对应的path
        console.log('labels 属性', sc.labels)
        console.log('--------------------------------')
    }
}

traverse(ast, visitor);
