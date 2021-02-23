// 自调用函数TYPE1去除，函数体抽离到父级作用域中，删除函数
const _base = require('../base');
const t = _base.t
const BasePlug = require("../base").default;
const visitor = {
    FunctionExpression(path) {
        if(path.node.params.length != 0){return;}
        if(path.key != 'callee'){return;}
        if(!t.isCallExpression(path.parentPath)){return;}
        if(!t.isExpressionStatement(path.parentPath.parentPath)){return;}
        func_bindings_name = Object.keys(path.scope.bindings);
        parent_bindins_name = Object.keys(path.parentPath.scope.bindings);
        func_bindings_name.forEach(func_binding_name => {
            if(parent_bindins_name.indexOf(func_binding_name) != -1){
                path.scope.rename(func_binding_name, 'another_'+func_binding_name)
            }
        });
        path.getStatementParent().replaceInline(path.node.body.body)
    }
}

exports.default = new BasePlug(
    'IIFE body extract to ParentNode body',
    visitor,
    '自调用函数函数去除，函数体抽离到父级作用域中，删除函数',
)


function demo() {
    const parser = _base.parser;
    const generator = _base.generator;
    var jscode = `
        var a = 3;
        var b = 4;
        (function (){
            var a = 'Well'
            console.log(a);
        })();
    `;
    let ast = parser.parse(jscode);
    let local_plug = new BasePlug(
        'IIFE body extract to ParentNode body',
        visitor,
        '自调用函数函数去除，函数体抽离到父级作用域中，删除函数',
    )
    local_plug.handler(ast)
    console.log('------------------')
    console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
}
demo()