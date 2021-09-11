// 反控制流平坦化插件
// 注意['split']
const { BasePlug, types, parser, generator, traverse } = require("../base");

const visitor = {
  ForStatement(path) {
    let { node } = path
    if (!types.isBlockStatement(node.body)) return;
      let body = node.body.body
    if (body.length !== 2) return;
    if (!types.isVariableDeclaration(body[0])) return;
    if (!types.isSwitchStatement(body[1])) return;

    let { bindings } = path.parentPath.scope
    // 處理block第一句中的中間定義
    body[0].declarations.map(declarator => {
      var binding = bindings[declarator.id.name];
      binding.referencePaths[0].replaceInline(declarator.init)
    })
    path.get('body.body.0').remove()
    path.scope.crawl()

    // 獲取關鍵變量的所有可能值
    let key_v_name = node.init.declarations[0].id.name
    let key_v_binding = bindings[key_v_name]
    let key_v_values = new Set(key_v_binding.constantViolations.map(ref_path => {
      if(! types.isAssignmentExpression(ref_path)) return;
      if(! types.isExpressionStatement(ref_path.parentPath)) return;
      if(! types.isNumericLiteral(ref_path.node.right)) return;
      return ref_path.node.right.value
    }))
    key_v_values.add(key_v_binding.path.node.init.value)
    key_v_values = Array.from(key_v_values)

    // 計算
    path.traverse({
      SwitchStatement(switch_path){
        let switch_node = switch_path.node
        var cul_func = eval('(function(v){' +
            'var ' + key_v_name + '= v;' +
            'return ' + generator(switch_node.discriminant)['code'] +
        '})')
        var switch_key_map = key_v_values.map(value => {
          var mark = {'in': value, 'case_value': cul_func(value)}
          mark['node_path'] = switch_path.get('cases.' + mark['case_value'] + '.consequent')
          // if(types.isBreakStatement(mark['node'][mark['node'].length - 1])){
          //   mark['node'].pop()
          // }
          return mark
        })
        switch_path.node.cases.map(case_node => {
          case_node.test.value
        })
      }
    })
    console.log(key_v_values)

  },
}

const plug = new BasePlug(
  'anti_control_stream_flate',
  visitor,
  '反控制流平坦化',
)
exports.default = plug;


function demo() {
  var jscode = `
  function e(e, a) {
    for (var s = 6; undefined !== s;) {
      var r = 7 & s,
          c = s >> 3,
          b = 7 & c;

      switch (r) {
        case 0:
          !function () {
            switch (b) {
              case 0:
                s = 24;
                break;

              case 1:
                k = k + 1;
                s = 24;
                break;

              case 2:
                i = i + "gth";
                s = 0;
                break;

              case 3:
                if (k < e[i]) {
                  s = 5;
                } else {
                  s = 4;
                }
            }
          }();
          break;

        case 1:
          return k;

        case 2:
          var k = 0,
              i = "len";

          if (i) {
            s = 16;
          } else {
            s = 0;
          }

          break;

        case 3:
          var o = "i";
          o = o + "ndexO";
          o = o + "f";
          var t = e[o](a);
          return t;

        case 4:
          var n = -1;
          return n;

        case 5:
          var h = e[k],
              d = h === a;

          if (d) {
            s = 1;
          } else {
            s = 8;
          }

          break;

        case 6:
          var u = "fOxedni".split("").reverse().join(""),
              p = e[u];

          if (p) {
            s = 3;
          } else {
            s = 2;
          }

      }
    }
  }
    `;
  let ast = parser.parse(jscode);
  plug.handler(ast)
  console.log(generator(ast)['code']);
}
demo()