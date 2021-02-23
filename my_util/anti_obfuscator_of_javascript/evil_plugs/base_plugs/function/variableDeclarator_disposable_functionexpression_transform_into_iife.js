// 函数定义作变量后仅被调用一次，未被修改，那么将它改写成函数改写成自调用形式，以便给 处理自调用的插件处理
const _base = require('../base');
const t = _base.t
const BasePlug = require("../base").default;
const visitor = {
    FunctionExpression(path){
        if(!t.isVariableDeclarator(path.parent)){return;}
        if(path.parent == path.getStatementParent()){return;}

        let dcclarate_binding = path.scope.getBinding(path.parent.id.name)
        if(!dcclarate_binding.constant){return;}

        let var_func_ref_paths = dcclarate_binding.referencePaths;
        if(var_func_ref_paths.length != 1){return;}
        if(var_func_ref_paths[0].getStatementParent() != var_func_ref_paths[0].parentPath.parentPath){return;}
        
        var_func_ref_paths[0].getStatementParent().replaceInline(
            t.ExpressionStatement(
                t.callExpression(path.node, var_func_ref_paths[0].parent.arguments)
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