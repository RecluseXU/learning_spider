var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
exports.default = {
    'id':'无参数自调用函数去除',
    'description':'自调用函数函数去除，函数体抽离到父级作用域中，删除函数',
    'visitor':{
        FunctionExpression(path) {
            if(path.node.params.length != 0){return;}
            if(path.key != 'callee'){return;}
            if(!t.isCallExpression(path.parentPath)){return;}
            if(!t.isExpressionStatement(path.parentPath.parentPath)){return;}
            path.getStatementParent().replaceInline(path.node.body.body)
        }
    }
}