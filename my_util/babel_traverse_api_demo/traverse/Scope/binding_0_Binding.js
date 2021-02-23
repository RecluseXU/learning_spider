// Binding 对象用于存储 被绑定在作用域的量 的信息
// 你可以在 @babel/traverse/lib/scope/binding.js 查看到它的定义  
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

const jscode = `
function a(){
    var a = 1;
    a = a + 1;
    return a;
}
function b(){
    var b = 1;
    var c = 2;
    b = b - c;
    return b;
}

`;
let ast = parser.parse(jscode);
const visitor = {
    BlockStatement(path){
        console.log("\n此块节点源码：\n", path.toString())
        console.log('----------------------------------------')
        var bindings = path.scope.bindings
        console.log('作用域内 被绑定量 数量：', Object.keys(bindings).length)

        for(var binding_ in bindings){
            console.log('名字：', binding_)
            binding_ = bindings[binding_];
            console.log('类型：', binding_.kind)
            console.log('定义：', binding_.identifier)
            console.log('是否为常量：', binding_.constant)
            console.log('被修改信息信息记录', binding_.constantViolations)
            console.log('是否会被引用：', binding_.referenced)
            console.log('被引用次数', binding_.references)
            console.log('被引用信息NodePath记录', binding_.referencePaths)
        }
    }
}

traverse(ast, visitor);
