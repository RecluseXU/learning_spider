var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types"); 

exports.default = {
    'id':'变量初始值取代变量引用',
    'description':'用变量的初始值取代引用变量的位置，删除没必要的声明的变量',
    'visitor':{
        VariableDeclarator(path){
            const {id, init} = path.node;
            if (!t.isLiteral(init)) return;
    
            const binding = path.scope.getBinding(id.name);
            if (!binding || !binding.constant) return;
                
            for (const refer_path of binding.referencePaths) {
                refer_path.replaceWith(init);
            }
            path.remove();
        },
    }
}