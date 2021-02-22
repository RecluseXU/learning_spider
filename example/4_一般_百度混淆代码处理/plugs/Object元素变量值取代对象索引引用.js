var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
exports.default = {
    'id':'Object元素变量值取代对象索引引用',
    'description':'Object元素变量值取代对象索引引用，仅取代字面量变量成员',
    'visitor':{
        VariableDeclarator(path) {
            const { id, init } = path.node;
            // 对象为空则不处理
            if (!t.isObjectExpression(init) || init.properties.length == 0) return;
            for (const property of init.properties) {  // 遍历对象key、value
                let value = property.value;
                // 如果值不是一个 字面量 就不处理
                if (!t.isLiteral(value))continue;
                
                // 遍历作用域的所有引用的记录，用值来替代引用的节点
                for(var _path of path.scope.getBinding(id.name).referencePaths){
                    var _node = _path.parentPath.node
                    if(t.isMemberExpression(_node) && t.isLiteral(_node.property, { value: property.key.value }))
                        _path.parentPath.replaceWith(value);
                }
            }
        }
    }
}