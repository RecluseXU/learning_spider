var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
exports.default = {
    'id':'压缩字面量参数',
    'description':'将那些声明字面量参数 作为变量写入到函数体内，以压缩代码',
    'visitor':{
        "CallExpression"(path){
            let exp_node = path.node;
            
            if(!t.isFunctionExpression(exp_node.callee))return;
            for(arg_ind in exp_node.arguments){
                if(!t.isLiteral(exp_node.arguments[arg_ind]))continue;
                let {type, value} = exp_node.arguments.splice(arg_ind)[0];
                let neo_var_name = exp_node.callee.params.splice(arg_ind)[0].name;
                let neo_var_node = t.variableDeclaration(
                    "var",
                    [t.VariableDeclarator(t.Identifier(neo_var_name), t[type](value))]
                );
                first_statement_path = path.get('callee.body.body.0')
                first_statement_path.insertBefore(neo_var_node)
                // first_statement_path.scope.rename(neo_var_name, 'func_arg_var_' + String(++__temp__))
            }
        }
    }
}