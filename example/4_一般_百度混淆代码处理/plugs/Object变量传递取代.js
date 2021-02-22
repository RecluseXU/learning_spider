var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
exports.default = {
    'id':'Object变量传递取代',
    'description':'对象定义后不使用，仅赋值给其它变量使用。则直接将初始值赋值给目标变量',
    'visitor':{
        VariableDeclaration(path){
            let {declarations} = path.node;
            for(declaration_ind in declarations){
                let {id, init} = declarations[declaration_ind];
                if(!t.isObjectExpression(init)){continue}
                
                let {constant, referencePaths} = path.scope.getBinding(id.name);
                if(!constant || referencePaths.length !== 1){continue}
                let ref_init = referencePaths[0].parentPath.node.init;
                if(!t.isIdentifier(ref_init) || ref_init.name !== id.name){continue};
                referencePaths[0].replaceInline(init);
                path.get('declarations.'+declaration_ind).remove();
            }
        }
    }
}