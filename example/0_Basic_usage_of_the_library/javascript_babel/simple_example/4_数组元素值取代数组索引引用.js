// 用数组的内容，替换通过序号获取数组内容的语句
// 1.大部分Array对象都是通过 var 来定义的。
//   因此，需要遍历 VariableDeclarator 节点
//   如果初始化是赋值语句，没有使用 var 定义，则可以将赋值语句先变成 声明语句(VariableDeclaration).
// 2.通过 scope.getBinding.referencePaths 来获取引用该Array对象的地方
// 3.因为Array对象取值一般都是 MemberExpression 表达式，因此找出它的 MemberExpression 父节点
// 4.判断父节点的property是否为字面量(一般为数字，即索引值)
// 5.通过索引值取出对应的Array对象，然后替换这个父节点即可。
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;

const jscode = `
var _2$SS = function(_SSz, _1111) {
    var _l1L1 = [46222, '\x74\x61\x43\x61\x70\x74\x63\x68\x61\x42\x6c\x6f\x62', '\x74', '\x61', '\x73', '\x6c', '\x64', '\x69', .3834417654519915, '\x65\x6e\x63\x72\x79\x70\x74\x4a', '\x73\x6f', '\x6e', 49344];
    var _2Szs = _l1L1[5] + _l1L1[7] + (_l1L1[4] + _l1L1[2])
      , _I1il1 = _l1L1[9] + (_l1L1[10] + _l1L1[11]);
    var _0ooQoO = _l1L1[0];
    var _$Z22 = _l1L1[12]
      , _2sS2 = _l1L1[8];
    return _l1L1[6] + _l1L1[3] + _l1L1[1];
};
`;
let ast = parser.parse(jscode);

const visitor = {
    VariableDeclarator(path){  // 还原数组对象
        // console.log(path.toString())
        const {id, init} = path.node;
        // 非Array或者没有元素，返回
        if (!t.isArrayExpression(init) || init.elements.length === 0)return;
        
        let elements = init.elements;
        // 获取binding实例
        const binding = path.scope.getBinding(id.name);
        for (const refer_path of binding.referencePaths){
            // 获取MemberExpression父节点
            let member_path = refer_path.findParent( p=>p.isMemberExpression() );
            let property = member_path.get('property');
            if (!property.isNumericLiteral())  // 索引值不是 NumericLiteral 类型则不做处理
                continue;
            // 获取索引值
            let index = property.node.value;  // 获取索引值对应的节点并替换
            let arr_ele = elements [ index ] ;
            member_path.replaceWith(arr_ele);
        }
    }
}

traverse(ast, visitor);
console.log(generator(ast)['code']);