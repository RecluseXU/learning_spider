// 著名的在线混淆网站obfuscator，有个对代码检测的选项，如果发现代码被格式化，则进入死循环，直至内存耗尽为止。
// 如果将该代码格式化后eval到处理混淆的代码中，也将内存溢出，因此将这部分代码进行压缩，
// 在eval到处理混淆的代码中，即可正常调用解密函数。
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env + "@babel/generator").default;

const jscode = `
    var a = parseInt("12345",16),b = Number("123"),c = String(true),d = unescape("hello%2CAST%21");
    eval("a = 1");
`;
let ast = parser.parse(jscode);


console.log('----------------------------');

const output = generator(ast,opts = {"compact":true}, jscode)['code'];
console.log(output);