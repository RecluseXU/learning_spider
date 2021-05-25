// 函数定义作变量后仅被调用一次，未被修改，那么将它改写成函数改写成自调用形式，以便给 处理自调用的插件处理
const _base = require('../base');
const t = _base.t
const BasePlug = require("../base").default;
const visitor = {
    FunctionExpression(path){
        // 为单句变量声明，且值是一个函数
        let statementPath = path.parent;
        if(!t.isVariableDeclarator(statementPath)){return;}
        if(statementPath == path.getStatementParent()){return;}
        // 未被修改
        let variableBinding = path.scope.getBinding(statementPath.id.name);
        if (!variableBinding.constant){return;}
        // 仅被引用一次
        let variableRefPaths = variableBinding.referencePaths;
        if(!variableRefPaths.length === 1){return;}
        
        let variableRefPath = variableRefPaths[0];
        if(variableRefPath.getStatementParent() !== variableRefPath.parentPath.parentPath){return;}
        
        variableRefPaths[0].getStatementParent().replaceInline(
            t.ExpressionStatement(
                t.callExpression(path.node, variableRefPaths[0].parent.arguments)
            )
        );
        path.getStatementParent().remove();
    }
}

exports.default = new BasePlug(
    'VariableDeclarator disposable FunctionExpression transform into IIFE',
    visitor,
    '函数定义作变量后仅被调用一次，未被修改，那么将它改写成函数改写成自调用形式，以便给 处理自调用的插件处理',
)


function demo(){
    const parser = _base.parser;
    const generator = _base.generator;
    var jscode = `
        var f = function(a, b){
            console.log('Well')
        }
        f(z, b);
        
        var f2 = function(a, b){
            console.log('No')
        }
        f2(z, b);
        f2 = f;
    `;
    let ast = parser.parse(jscode);
    let local_plug = new BasePlug(
        'IfStatement consequent transform into BlockStatement',
        visitor,
        '函数定义作变量后仅被调用一次，未被修改，那么将它改写成函数改写成自调用形式，以便给 处理自调用的插件处理',
    )
    local_plug.handler(ast)
    console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
}
demo()