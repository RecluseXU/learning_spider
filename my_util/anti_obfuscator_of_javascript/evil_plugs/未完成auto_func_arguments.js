const {BasePlug, types, parser, generator, traverse} = require("./base_plugs/base");


const jscode = `
var a = [],
    b = 2;
(function (x){
    return x+1;
})(a);
a = a+1
`

let ast = parser.parse(jscode);

let visitor = {
    ExpressionStatement(path){
        let expression_node = path.node.expression
        if(!types.isCallExpression(expression_node)){return}
        if(!types.isFunctionExpression(expression_node.callee)){return}
        if(expression_node.arguments.length == 0){return}
        let real_args = expression_node.arguments;
        let formal_args = path.node.expression.callee.params;
        let func_scope = path.get('expression.callee.params.0').scope;
        
        for(arg_ind in real_args){
            // 如果是表达式，那么无法使用
            if (! types.isIdentifier(real_args[arg_ind])){continue}
            // 实参引用是第一次引用
            let real_arg_binding = path.scope.getBinding(real_args[arg_ind].name);
            if(! real_arg_binding.referencePaths[0].node === real_args[arg_ind]){continue}
            // 实参需要时地址引用的类型（Object || Array）
            let real_arg_init = real_arg_binding.path.node.init
            if(! types.isArrayExpression(real_arg_init) && ! types.isObjectExpression(real_arg_init)){continue}
            // 声明节点所在语句与引用节点对应语句是兄弟，即在同一作作用域
            if(! path.scope === real_arg_binding.path.scope){continue}
            
            func_scope.rename(formal_args.pop(arg_ind).name, real_args.pop(arg_ind).name)
        }
    }
}


traverse(ast, visitor);
console.log('----------------------------');
console.log(generator(ast)['code']);