// 多变量声明转为多句单变量声明
/******************************
处理前:
var a = 123,b = 456;
let c  = 789,d = 120;
处理后:
var a = 123;
var b = 456;
let c = 789;
let d = 120;
******************************/
const {BasePlug, types, parser, generator, traverse} = require("../base");

const visitor = 
{
	VariableDeclaration(path) {
		let {declarations,kind} = path.node;
		if (declarations.length == 1) { return; }
		let newDeclartionNode = types.VariableDeclaration(kind,[declarations[0]]);
		path.insertBefore(newDeclartionNode);
		declarations.shift();
		path.visit();
	},
}


const plug = new BasePlug(
    'Mult declaration extract',
    visitor,
    '单语句多个变量声明 转 多语句单变量声明',
)
exports.default = plug;


function demo(){
    var jscode = `
		var a = 123, b = 456;
		let c = 789, d = 120;
		const e = 369, f = 258;
    `;
    let ast = parser.parse(jscode);
    plug.handler(ast)
    console.log(generator(ast)['code']);
}
demo()
