// 删除永远达不到的if(true/false){}else{}代码块
const { BasePlug, types, parser, generator, traverse } = require("../base");

const visitor = {
	IfStatement(path) {
		const test = path.node.test;
		if(!types.isBooleanLiteral(test)){return}
		const usefullBlock = test.value? path.node.consequent.body: path.node.alternate.body;
		path.replaceWithMultiple(usefullBlock)
	}
}

const plug = new BasePlug(
    'delete useless if block',
    visitor,
    '删除永远达不到的if(true/false){}else{}代码块',
)
exports.default = plug;


// function demo() {
//     var jscode = `
// 	var a;
// 	if(true){
// 		a = 1;
// 	}else{
// 		a = 2;
// 	}

// 	if(false){
// 		a = 3;
// 	}else{
// 		a = 4
// 	}
//     `;
//     let ast = parser.parse(jscode);
//     plug.handler(ast)
//     console.log('------------------')
//     console.log(generator(ast)['code']);
// }
// demo()
