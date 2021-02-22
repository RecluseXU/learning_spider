exports.default = {
    'id':'删除未使用的变量',
    'description':'删除声明了却没有用过的函数参数',
    'visitor':{
        VariableDeclarator(path){
            const binding = path.scope.getBinding(path.node.id.name);
            if(binding && !binding.referenced && binding.constant){
                path.remove();
            }
        }
    }
}