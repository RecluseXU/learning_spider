let __temp__ = {};
exports.default = {
    'id':'变量名重命名',
    'description':'根据作用域，将所有变量进行重命名',
    'visitor':{
        enter(path){
            if(!__temp__['scope_mark']){__temp__['scope_mark']=[];}
            if(!__temp__['scope_index']){__temp__['scope_index']=0;}
            if(__temp__['scope_mark'].indexOf(path.scope) != -1){return;}
            let scope = path.scope,
                variable_ind = 0;
            for(variable_name in scope.bindings){
                if(variable_name.indexOf('_0x') == -1){return;}
                scope.rename(
                    variable_name, 
                    's'+String(__temp__['scope_index'])+'_'+scope.bindings[variable_name]['kind']+String(variable_ind++)
                );
            }
            __temp__['scope_index']++;
            __temp__['scope_mark'].push(scope);
        }
    }
}