var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
exports.default = {
    'id':'临时针对s7_var0赋值的try_except简化',
    'description':'临时针对s7_var0赋值的try-except简化',
    'visitor':{
        TryStatement(path){
            if(!path.node.handler.param.name === 's9_let0'){return;}
            let binding = path.scope.getBinding('s7_var0');
            if(!binding){return;}
            for(ref_path of binding.referencePaths){
               ref_path.node.name = 'window'
            }
            binding.path.remove();
            path.remove();

        }
    }
}