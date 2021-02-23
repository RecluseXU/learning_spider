// 自调用函数TYPE1去除，函数体抽离到父级作用域中，删除函数
const _base = require('../base');
const t = _base.t
const traverse = _base.traverse;
const BasePlug = require("../base").default;

let aim_function_name = 'f2';
const visitor = {
    CallExpression(path){
		if(path.node.callee.name !== aim_function_name){return}
        all_arg_is_literal = path.node.arguments.every(argument => {return t.isLiteral(argument);})
		if(!all_arg_is_literal){return}

		// 函数内部
		let func_scope = path.scope.getBinding(aim_function_name).path;

        try{
			eval(func_scope.path.toString() + '\nvar ___temp___=' + path.toString());
			path.replaceInline(t.valueToNode(___temp___));
		}catch(e){
			console.log(e);
		}

    }
}

exports.default = new BasePlug(
    'Callexpression to return value',
    visitor,
    '函数调用返回值取代函数调用',
)


function demo() {
    const parser = _base.parser;
    const generator = _base.generator;
	var jscode = `
		var q = 9;
        function f(a, b){return a+q;}
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