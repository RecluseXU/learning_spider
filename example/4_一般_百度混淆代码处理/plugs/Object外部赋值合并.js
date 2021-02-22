var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
exports.default = {
    'id':'Object外部赋值合并',
    'description':'尝试将一步步的外部赋值合并到声明的地方',
    'visitor':{
        VariableDeclarator(path) {
            const { id, init } = path.node;
            if (!t.isObjectExpression(init)) return;  // 初始值要是一个对象

            let name = id.name;
            let properties = init.properties;
            let all_next_siblings = path.parentPath.getAllNextSiblings();  // 获取当前定义语句后的同级的所有语句
            
            for (let next_sibling of all_next_siblings) {
                // 判断市表达式，且属于一开始声明的对象
                if (!next_sibling.isExpressionStatement()) break;
                let expression = next_sibling.get('expression');
                if (!expression.isAssignmentExpression()) break;
                let { operator, left, right } = expression.node;
                if (operator != '=' || !t.isMemberExpression(left) || !t.isIdentifier(left.object, { name: name })) {
                    break;
                }
                // 利用已有的信息，将内容重建一个新的ObjectProperty节点，塞入对象声明里
                properties.push(t.ObjectProperty(left.property, right));
                next_sibling.remove();  // 删除原本的节点
            }
        }
    }
}