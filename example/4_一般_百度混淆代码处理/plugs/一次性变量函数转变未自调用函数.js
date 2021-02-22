var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");

exports.default = {
    'id':'一次性变量函数转变未自调用函数',
    'description':'函数定义作变量后仅被调用一次，未被修改，那么将它改写成函数改写成自调用形式，以便给 处理自调用的插件处理',
    'visitor':{
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
}