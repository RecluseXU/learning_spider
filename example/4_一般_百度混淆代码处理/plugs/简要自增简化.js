exports.default = {
    'id':'简要自增简化',
    'description':'只使用一次的简单自增操作，可以尝试判断情况，将操作直接作用于初始值以简化代码',
    'visitor':{
        UpdateExpression(path){
            if(path.inType('ForStatement', 'WhileStatement', 'DoWhileStatement')){return;}
            let {prefix, operator, argument} = path.node;
            if(!prefix){return}
            let binding = path.getStatementParent().parentPath.scope.getBinding(argument.name);
            if(!binding){return}
            if(!binding.references === 1){return}
            if(!binding.constantViolations == 1){return}
            let new_init = Number(binding.path.node.init.value);
            if(operator == '++')
                new_init++;
            else if(operator == '--')
                new_init--;
            binding.path.node.init.value = String(new_init);
            path.replaceInline(argument)
        }
    }
}