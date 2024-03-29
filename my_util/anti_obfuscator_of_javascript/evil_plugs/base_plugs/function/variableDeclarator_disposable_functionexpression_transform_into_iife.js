// 函数定义作变量后仅被调用一次，未被修改，那么将它改写成函数改写成自调用形式，以便给 处理自调用的插件处理
const {BasePlug, types, parser, generator, traverse} = require("../base");

const visitor = {
    FunctionExpression(path){
<<<<<<< HEAD
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
=======
        // 作为变量存在
        let {parent} = path;
        if(!types.isVariableDeclarator(parent)){return;}
        if(parent == path.getStatementParent()){return;}

        // 定义后未被修改
        let declarateBinding = path.scope.getBinding(parent.id.name)
        if(!declarateBinding.constant){return;}

        // 仅被引用一次
        let referencePaths = declarateBinding.referencePaths;
        if(referencePaths.length != 1){return;}
        if(referencePaths[0].getStatementParent() != referencePaths[0].parentPath.parentPath){return;}

        
        // 替换目标
        referencePaths[0].getStatementParent().replaceInline(
            types.ExpressionStatement(
                types.callExpression(path.node, referencePaths[0].parent.arguments)
>>>>>>> f482d3efbf33e624913b2b313a3cfd689495c80a
            )
        );
        path.getStatementParent().remove();
    }
}

const plug = new BasePlug(
    'VariableDeclarator disposable FunctionExpression transform into IIFE',
    visitor,
    '函数定义作变量后仅被调用一次，未被修改，那么将它改写成函数改写成自调用形式，以便给 处理自调用的插件处理',
);
exports.default = plug;
 

function demo(){
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

        var f3 = function(a, b){
            console.log('Yes')
        }
        f3(1, 2, 3)
    `;
    let ast = parser.parse(jscode);
    let local_plug = new BasePlug(
        'IfStatement consequent transform into BlockStatement',
        visitor,
        '函数定义作变量后仅被调用一次，未被修改，那么将它改写成函数改写成自调用形式，以便给 处理自调用的插件处理',
    )
    local_plug.handler(ast)
    console.log('----------------')
    console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
}
demo()