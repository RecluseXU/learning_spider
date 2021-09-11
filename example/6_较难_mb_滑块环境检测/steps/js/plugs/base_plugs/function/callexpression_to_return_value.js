// 单返回语句函数调用返回值取代函数调用
const {BasePlug, types, parser, generator, traverse} = require("../base");


const visitor = {
    CallExpression(path){
        // 检查传入实参皆为 Literal
        let argumentsNode = path.node.arguments;
        for(var argumentNode of argumentsNode){
            if(!types.isLiteral(argumentNode)){return}
        }
        // 获取函数定义
        let funcName = path.node.callee.name;
        let funcPath = path.scope.getBinding(funcName).path;
        if(types.isVariableDeclarator(funcPath)){
            funcPath = funcPath.get('init');
        }
        // 检查函数体仅一句 return
        let funcBody = funcPath.node.body.body;
		if(funcBody.length !== 1 || types.isReturnStatement(funcBody)){return}

        // 转换
        let funcString = funcPath.toString();
        funcString = funcString.replace('/^function[^(]+?/', ' ')
        
        let argumentsString = argumentsNode.map((argument) => {return argument.value}).join(', ')
        try{
            let value = eval('(' + funcString + ')(' + argumentsString + ')');
			path.replaceInline(types.valueToNode(value));
		}catch(e){
			console.log(e);
		}

    }
}

const plug = new BasePlug(
    'Callexpression to return value',
    visitor,
    '函数调用返回值取代函数调用',
);
plug['handler'] = function (ast) {
    console.log('Using plug:',this.name)
    console.log('Plug description:',this.description)
    traverse(ast, this.visitor);
}
exports.default = plug;


function demo() {
	var jscode = `
		var q = 9;
        function f(a, b){return a+b;}
		var f2 = function(x, y){return x}
		var z = f2(3, 2);
		var x = f(4, 5);
    `;
    let ast = parser.parse(jscode);
    let local_plug = new BasePlug(
        'Callexpression to return value',
        visitor,
        '函数调用返回值取代函数调用',
    )
    local_plug.handler(ast)
    console.log('------------------')
    console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
}
demo()