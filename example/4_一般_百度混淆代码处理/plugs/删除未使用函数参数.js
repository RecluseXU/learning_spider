exports.default = {
    'id':'删除未使用函数参数',
    'description':'删除声明了却没有用过的函数参数',
    'visitor':{
        "FunctionDeclaration|FunctionExpression"(path) {
            for(let binding of Object.values(path.scope.bindings)){
                if(binding.kind !== 'param'){continue;}
                if(binding.referenced){continue;}
                delete binding.path.remove()
            }
        }
    }
}