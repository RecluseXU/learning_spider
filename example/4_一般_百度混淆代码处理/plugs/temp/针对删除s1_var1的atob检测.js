var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
exports.default = {
    'id':'针对删除s1_var1的atob检测',
    'description':'针对删除s1_var1的atob检测',
    'visitor':{
        LogicalExpression(path){
            if(!t.isMemberExpression(path.node.left)){return;}
            if(!path.node.left.object.name === 'window'){return;}
            if(!t.isStringLiteral(path.node.left.property)){return;}
            if(!path.node.left.property.value == 'atob'){return;}
            path.getStatementParent().remove();
        }
    }
}