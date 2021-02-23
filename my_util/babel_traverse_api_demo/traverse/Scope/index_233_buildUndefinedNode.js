// Scope.buildUndefinedNode()
// @return Node
// 相当于创建一个 void 0 节点  
// 讲道理，在scope的文件里声明这样的方法真的好吗，你不是应该在types里出现吗
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;

const jscode = `a`;
let ast = parser.parse(jscode);
const visitor = {
    ExpressionStatement(path){
        if(path.node.expression.type != 'Identifier')return ;
        var void_node = path.scope.buildUndefinedNode()
        path.replaceInline(void_node)  // 在当前path前面插入节点
    }
}

traverse(ast, visitor);
console.log(generator(ast)['code'])