// 反控制流平坦化插件
// 注意['split']
const _base = require('./base_plugs/base');
const t = _base.t
const BasePlug = require("./base_plugs/base").default;

const visitor = {
	WhileStatement(path)
	{
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

exports.default = new BasePlug(
    'anti_control_stream_flate',
    visitor,
    '反控制流平坦化',
)


function demo(){
    const parser = _base.parser;
    const generator = _base.generator;
    var jscode = `
        var arr = "3|0|1|2|4".['split']("|");
        var cnt = 0;
        while (true) {
            switch (arr[cnt++]) {
                case "0":
                    console.log("This is case-block 0")
                    continue;
                case "1":
                    console.log("This is case-block 1");
                    continue;
                case "2":
                    console.log("This is case-block 2");
                    continue;
                case "3":
                    console.log("This is case-block 3");
                    continue;
                case "4":
                    console.log("This is case-block 4");
                    continue;
            }
            break;
        };
    `;
    let ast = parser.parse(jscode);
    let local_plug = new BasePlug(
        'anti_control_stream_flate',
        visitor,
        '反控制流平坦化',
    )
    local_plug.handler(ast)
    console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
}
demo()