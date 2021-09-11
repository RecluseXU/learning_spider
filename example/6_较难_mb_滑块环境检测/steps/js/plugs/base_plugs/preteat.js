const {BasePlug, types, parser, generator, traverse} = require("./base");


const pretreatCode = function (jscode){
	// 预处理代码
	// 删除注释，压缩
    let ast = parser.parse(jscode);
	jscode = generator(ast, {'comments': false, 'compact': true, 'minified': true})['code']
	ast = parser.parse(jscode)
	return generator(ast)['code']
}


exports.pretreatCode = pretreatCode
