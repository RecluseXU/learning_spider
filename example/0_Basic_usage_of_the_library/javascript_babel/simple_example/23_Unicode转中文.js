// Unicode转中文或者其他非ASCII码字符。
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

const output = generator(ast,opts = {jsescOption:{"minimal":true}},jscode)['code'];
console.log(output);