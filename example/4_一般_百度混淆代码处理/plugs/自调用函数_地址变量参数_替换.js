var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
exports.default = {
    'id':'自调用函数_地址变量参数_替换',
    'description':'基于地址的变量（Object，Array之类）作为函数参数传入后，其形参被改变，会影响到实参，为了后续去除自调用函数，此处用用实参名来替换形参，去除形参',
    'visitor':{
        ExpressionStatement(path){
            let expression_node = path.node.expression
            if(!t.isCallExpression(expression_node)){return}
            if(!t.isFunctionExpression(expression_node.callee)){return}
            if(expression_node.arguments.length == 0){return}
            let real_args = expression_node.arguments;
            let formal_args = path.node.expression.callee.params;
            let func_scope = path.get('expression.callee.params.0').scope;
            
            for(arg_ind in real_args){
                // 如果是表达式，那么无法使用
                if (! t.isIdentifier(real_args[arg_ind])){continue}
                // 实参引用是第一次引用
                let real_arg_binding = path.scope.getBinding(real_args[arg_ind].name);
                if(! real_arg_binding.referencePaths[0].node === real_args[arg_ind]){continue}
                // 实参需要时地址引用的类型（Object || Array）
                let real_arg_init = real_arg_binding.path.node.init
                if(! t.isArrayExpression(real_arg_init) && ! t.isObjectExpression(real_arg_init)){continue}
                // 声明节点所在语句与引用节点对应语句是兄弟，即在同一作作用域
                if(! path.scope === real_arg_binding.path.scope){continue}
                func_scope.rename(formal_args.pop(arg_ind).name, real_args.pop(arg_ind).name)
            }
        }
    }
}