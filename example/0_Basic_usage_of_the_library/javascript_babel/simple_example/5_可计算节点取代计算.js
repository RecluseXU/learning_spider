// NodePath.evaluate()用于计算当前path对应节点的计算结果（如果可以计算的话）
// 如果有计算结果，就用计算结果生成节点来替换原本的节点
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;


const jscode = `
var zzz = !![];
var _2$SS = function (_SSz, _1111) {
  var _l1L1 = [46222, 'taCaptchaBlob', 't', 'a', 's', 'l', 'd', 'i', .3834417654519915, 'encryptJ', 'so', 'n', 49344];

  var _2Szs = 'l' + 'i' + ('s' + 't'),
      _I1il1 = 'encryptJ' + ('so' + 'n');

  var _0ooQoO = 46222;
  var _$Z22 = 49344,
      _2sS2 = .3834417654519915;
  return 'd' + 'a' + 'taCaptchaBlob';
};
`;

const ast = parser.parse(jscode);
const visitor = {
  "BinaryExpression|UnaryExpression"(path){ 
    try{
      const {confident, value} = path.evaluate();
      confident && path.replaceInline(t.valueToNode(value));
    }catch (error) {}
  },
}

traverse(ast, visitor);
console.log(generator(ast)['code'])