// 删除仅用于返回 window 对象的函数
const {BasePlug, types, parser, generator, traverse} = require("../base_plugs/base");

const visitor = { 
    FunctionDeclaration(path){
		if(path.node.id.name !== 'go'){return}
		const detactFuncBinding = path.scope.getBinding(path.node.body.body[0].id.name);

		for(var refPath of detactFuncBinding.referencePaths){
			refPath.getStatementParent().remove()
		}
		detactFuncBinding.path.getStatementParent().remove()
		
    }
}

const plug = new BasePlug(
    'delete webdriver detact',
    visitor,
    '删除webdriver检查函数',
)
exports.default = plug;


function demo(){
    var jscode = `
		function go(){  
			function _0x7d66d7() {
				var _0x52f357 = window["navigator"]["userAgent"],
					_0x450a7a = ["Phantom"];

				for (var _0x535c7e = 0; _0x535c7e < _0x450a7a["length"]; _0x535c7e++) {
					if (_0x52f357["indexOf"](_0x450a7a[_0x535c7e]) != -1) {
					return true;
					}
				}

				if (window["callPhantom"] || window["_phantom"] || window["Headless"] || window["navigator"]["webdriver"] || window["navigator"]["__driver_evaluate"] || window["navigator"]["__webdriver_evaluate"]) {
					return true;
				}
			}

		;

			if (_0x7d66d7()) {
				return;
			}
		}
    `;
    let ast = parser.parse(jscode);
    plug.handler(ast)
    console.log(generator(ast)['code']);
}
demo()
