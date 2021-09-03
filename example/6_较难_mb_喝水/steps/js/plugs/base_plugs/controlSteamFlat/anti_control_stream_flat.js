// 反控制流平坦化插件
// 注意['split']
const {BasePlug, types, parser, generator, traverse} = require("../base");

const visitor = {
	WhileStatement(path) {
		const {node, scope} = path;
		const {test, body}  = node;
		if (!types.isLiteral(test, {value:true})) return;
		if (body.body.length != 2) return;
		let switchNode = body.body[0], 
            breakNode = body.body[1];
		if (!types.isSwitchStatement(switchNode) || !types.isBreakStatement(breakNode)) return;

		let {discriminant, cases} = switchNode;
		if (!types.isMemberExpression(discriminant)) return;
		let {object, property} = discriminant;
		if (!types.isIdentifier(object) || !types.isUpdateExpression(property)) return;
		let arrayName = object.name;
		let binding =  scope.getBinding(arrayName);
		if (!binding || !binding.path || !binding.path.isVariableDeclarator()) return;
		let {init} = binding.path.node; 
		if (!types.isCallExpression(init) || !types.isMemberExpression(init.callee)) return;
		object   = init.callee.object;
		property = init.callee.property;
		if (!types.isStringLiteral(object) || !types.isStringLiteral(property,{value:"split"})) return;
		
		let disPatchArray = object.value.split("|");
		let retBody = [];
		disPatchArray.forEach(index =>{
			let caseBody = cases[index].consequent;
			if (types.isContinueStatement(caseBody[caseBody.length-1])){
				caseBody.pop();
			}
			retBody = retBody.concat(caseBody);
		})
		
		path.replaceWithMultiple(retBody);
	},
}

const plug = new BasePlug(
    'anti_control_stream_flate',
    visitor,
    '反控制流平坦化',
)
exports.default = plug;


// function demo(){
//     var jscode = `
//         var arr = "3|0|1|2|4".['split']("|");
//         var cnt = 0;
//         while (true) {
//             switch (arr[cnt++]) {
//                 case "0":
//                     console.log("This is case-block 0")
//                     continue;
//                 case "1":
//                     console.log("This is case-block 1");
//                     continue;
//                 case "2":
//                     console.log("This is case-block 2");
//                     continue;
//                 case "3":
//                     console.log("This is case-block 3");
//                     continue;
//                 case "4":
//                     console.log("This is case-block 4");
//                     continue;
//             }
//             break;
//         };
//     `;
//     let ast = parser.parse(jscode);
//     plug.handler(ast)
//     console.log(generator(ast)['code']);
// }
// demo()