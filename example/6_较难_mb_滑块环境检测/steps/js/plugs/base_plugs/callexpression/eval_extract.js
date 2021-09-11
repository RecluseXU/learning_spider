const { BasePlug, types, parser, generator, traverse, template } = require("../base");

const visitor = {
	CallExpression: {
		exit: function (path) {
			let { callee, arguments } = path.node;
			if (arguments.length !== 1 || !types.isLiteral(arguments[0])) { return }
			if (types.isIdentifier(callee, { name: "eval" })) {
				const evalNode = template.statements.ast(arguments[0].value);
				path.replaceWithMultiple(evalNode);
			}
		}
	}
}


const plug = new BasePlug(
	'eval inner code extract',
	visitor,
	'eval 内部内容抽离',
);

exports.default = plug;


function demo() {
	var jscode = `
        eval('var a, b=2; a=b; var c;')
    `;
	let ast = parser.parse(jscode);
	plug.handler(ast)
	console.log(generator(ast)['code']);
}
demo()
