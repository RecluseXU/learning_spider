var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
exports.default = {
    'id':'反控制流平坦化',
    'description':'针对OB特点的反控制流平坦化',
    'visitor':{
        WhileStatement(path){
            const {node, scope} = path;
            const {test, body}  = node;
            if (!t.isLiteral(test, {value:true})) return;
            if (body.body.length != 2) return;
            let switchNode = body.body[0], 
                breakNode = body.body[1];
            if (!t.isSwitchStatement(switchNode) || !t.isBreakStatement(breakNode)) return;

            let {discriminant, cases} = switchNode;
            if (!t.isMemberExpression(discriminant)) return;
            let {object, property} = discriminant;
            if (!t.isIdentifier(object) || !t.isUpdateExpression(property)) return;
            let arrayName = object.name;
            let binding =  scope.getBinding(arrayName);
            if (!binding || !binding.path || !binding.path.isVariableDeclarator()) return;
            let {init} = binding.path.node; 
            if (!t.isCallExpression(init) || !t.isMemberExpression(init.callee)) return;
            object   = init.callee.object;
            property = init.callee.property;
            if (!t.isStringLiteral(object) || !t.isStringLiteral(property,{value:"split"})) return;
            
            let disPatchArray = object.value.split("|");
            let retBody = [];
            disPatchArray.forEach(index =>{
                let caseBody = cases[index].consequent;
                if (t.isContinueStatement(caseBody[caseBody.length-1])){
                    caseBody.pop();
                }
                retBody = retBody.concat(caseBody);
            })
            
            path.replaceWithMultiple(retBody);
        },
    }
}