// 函数定义作变量后仅被调用一次，未被修改，那么将它改写成函数改写成自调用形式，以便给 处理自调用的插件处理
const {BasePlug, types, parser, generator, traverse} = require("../base");

const visitor = {
    FunctionExpression(path){
        // 作为变量存在
        let {parent} = path;
        if(!types.isVariableDeclarator(parent)){return}
        if(parent == path.getStatementParent()){return}
        // 定义后未被修改
        let declarateBinding = path.scope.getBinding(parent.id.name)
        if(!declarateBinding.constant){return}
        // 仅被引用一次
        if(declarateBinding.referencePaths.length != 1){return}
        // 被引用即是被调用
        let referencePath = declarateBinding.referencePaths[0];
        if(referencePath.key !== 'callee'){return}
        // 为调用函数体中直接调用
        if(referencePath.getStatementParent() != referencePath.parentPath.parentPath){return;}

        // 替换目标
        while(!types.isCallExpression(referencePath)){
            referencePath = referencePath.parentPath;
        }
        let ifee = types.callExpression(path.node, referencePath.node.arguments);
        
        referencePath.replaceInline(ifee);
        path.getStatementParent().remove();
    }
}

const plug = new BasePlug(
    'Disposable variable FunctionExpression transform into IIFE',
    visitor,
    '函数定义作变量后仅被调用一次，未被修改，那么将它改写成函数改写成自调用形式，以便给 处理自调用的插件处理',
);
exports.default = plug;
 

function demo(){
    var jscode = `
        var f = function(a, b){ console.log('Well') }
        f(z, b);
        
        var f2 = function(a, b){ console.log('No') }
        var z = f2;

        var f3 = function(a, b){ console.log('Yes') }
        var z = f3(1, 2, 3);
    `;
    let ast = parser.parse(jscode);
    plug.handler(ast)
    console.log('----------------')
    console.log(generator(ast)['code']);
}
demo()