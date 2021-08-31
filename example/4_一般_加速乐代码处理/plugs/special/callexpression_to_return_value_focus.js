// 函数返回值取代函数调用

const { BasePlug, types, parser, generator, traverse } = require("../base_plugs/base");
const {window, atob} = require("../env");

const visitor = {
    Program(path) {
        let { body } = path.node;
        // 头两句变量是声明
        if (!types.isVariableDeclaration(body[0])) { return }
        if (!types.isVariableDeclaration(body[1])) { return }
        // 首句声明为单个数组定义
        let declaration = body[0].declarations;
        if (declaration.length !== 1) { return }
        // 首句初始值为数组
        declaration = declaration[0];
        if (!types.isArrayExpression(declaration.init)) { return }
        // 第二句为单个变量函数定义
        declaration = body[1].declarations;
        if (declaration.length !== 1) { return }
        declaration = declaration[0];
        if (!types.isFunctionExpression(declaration.init)) { return }
        // 函数定义了两个形参
        if (declaration.init.params.length !== 2) { return }
        // 函数变量被大量调用
        const funcName = declaration.id.name;
        const keyFuncBinding = path.scope.getBinding(funcName);
        if (keyFuncBinding.references < 10) { return }

        // 临时代码生成
        const params = keyFuncBinding.path.get('init.params').toString();
        const code = [
            '(function(' + params + '){', path.get('body.0').toString(),
            path.get('body.1').toString(),
            'return ' + funcName + '(' + params + ')',
            '})',
        ].join('\n')

        // 调用实参组合计算结果替换
        var tempCode, arguments, noError = true;
        for (let refPath of keyFuncBinding.referencePaths) {
            let callPath = refPath.parentPath;
            if (!types.isCallExpression(callPath)) { continue }
            arguments = '("' + callPath.node.arguments.map((argument) => { return argument.value }).join('", "') + '")';
            tempCode = code + arguments;
            try {
                var result = eval(tempCode)
                callPath.replaceWith(types.StringLiteral(result))
            } catch (error) {
                console.error(error);
                noError = false;
            }
        }
    }
}

const plug = new BasePlug(
    'Callexpression to Value',
    visitor,
    '函数调用返回值取代函数调用',
);

exports.default = plug;


// function demo() {
//     var jscode = `
// var _0x5889 = ["w4Bvw6gA", "w6E8w5fCsg==", "wp/Dl8Kkwog=", "w4Ihw5TCrw==", "SRVHwo8=", "WVJBwp8=", "w5/CncK9Dw==", "TcKyeMOb", "w6XCoE7DmA==", "RcK3VSc=", "wp3Dk8K8woY=", "w6RWwp1m", "dHtNw70=", "w47CmsKOCg==", "YcKbwrzClw==", "EGYsw6s=", "YVJqw5c=", "w4XCuW7DnA==", "XcK7ZsK8", "w7/Ck8OGEw==", "w7l5FFg=", "wq1ewqI=", "wozDv8OWwo4=", "w5/Cp8OzGg==", "woHDksKIwqk=", "w5/Dt8Ojw40=", "fWAhw4s=", "wp/DtcODwo4=", "diTDp8Oo", "w745O8Og", "eMO7w7nDqw==", "SsKFw7fDoA==", "wobDgQnDkQ==", "CV0kw5k=", "YsKMVsK3", "ScKPw4Yu", "w6nCuMK7Nw==", "w4RVwqtP", "woDDkhjCsA==", "Q8KsasOX", "Xkdjw4s=", "HcKoa34=", "w4TDpMO6w7M=", "w6N1w5oE", "wprDl8K3DA==", "wprDqywY", "w4JqK0I=", "wr/DmMO+KA==", "wqNcLzQ=", "eMKKw4Uk", "w51dwohm", "wqjDoMOAPQ==", "w53Ci8K+HQ==", "w6ArUhc=", "wonCk8K6wqg=", "w4nCi0HDuQ==", "ecKCRMK8", "w6Uew7zCrA==", "FRF4w6g=", "wplOwrzDpA==", "w4Fqwp9W", "aVRCwoU=", "wrvDmS/Dqg==", "w4PChsKAFQ==", "w4zCtkPDtA==", "bcOJwqHCig==", "WWAuw4g=", "w6gQShU=", "WMKKw7Ea", "wqbDksOrwrw=", "MgXDp8KD", "S8OVH8Kt", "ZlJkw4o=", "VsKddMKp", "w4rCk8KbFw==", "XcKZaQ==", "wotWawA=", "wohowpd7", "V8Kzwr/Cqw==", "KH0tw4o=", "ZMKVV8OT", "e1xPwo4=", "Q8ODwrXDmQ==", "w4ghw4/CkQ==", "M8KbdkY=", "dMKFUsO5", "Rh8sIQ==", "w5PClWPDjw==", "w5IQAcOC", "HcKVwqTDlA==", "Ez7DvcKN", "w7U3aSw=", "W8KRfsKx", "Agldw6I=", "w7LCt0HDgw==", "wpzDuS3DgQ==", "wpB2Vx4=", "wr3DmzfCmg==", "wqjCgcKywqs=", "CxLDicKh", "wpXCkMKTwoM=", "wp9EJic=", "TsOOI8Ky", "w4Jpw5Ef", "w4xmUMK6", "wpLCocKYwqo=", "wqzDiEJH", "S8K2w6XDpw==", "W3Aqw5g=", "wp/DnMKbAQ==", "enYDw74=", "UlBt", "w5zConXDhA==", "VcKlf8OA", "UsKrTSQ=", "YsOAwqzDow==", "w6J8wq51", "KMOMZMOq", "e0Z5w6k=", "wqx1wrZB", "wofDoMKnHw==", "KUYlw5o=", "DB5Mw78=", "wpJVGhY=", "KUEEw5k=", "UFR6woo=", "wqfDogMy", "w5goN8OO", "w7tZZsKG", "wotQwptd", "wqHDjxjCgg==", "wpBwwrtP", "CgPDuw==", "w6tQw7Yw", "FGIiw60=", "wpnDjCI9", "KQ5Mw7g=", "w7HCiHbDtQ==", "BgBIw78=", "HB1Qw4A=", "fMKJYcKa", "wqRIwqvDvw==", "wpXDi8KOGg==", "Y2w5w4k=", "wp9ROCc=", "w77DpcOrw44=", "ehU7HQ==", "McO3NMKr", "JCPDgMKz", "XMO+wqXDgg==", "YsKXw50b", "w4JaR8Kt", "wqnDrjot", "J8KkaV8=", "w5NbwqdW", "YcO0wpTClA==", "UcKvw5Mo", "Q2Qbw7w=", "w4jCosOdPQ==", "QlBSwq8=", "VcOQwqjCnw==", "KFINw7Y=", "YcOOw5nDkg==", "w6F0Fko=", "ckorw5s=", "w6JaMVY=", "ccOEw5fDiw==", "w5UZH8Od", "wqTDhC0b", "wql/Xgs=", "wqHDlRs3", "XwjDs8OI", "L8OAw5HDnA==", "a3huwpM=", "EMOPU8Om", "NcOjY8Oh", "w5I8w5fCrg==", "ISJ9w4I=", "YMOFw4TDkA==", "w6tEZcKH", "TsKWw4fDlw==", "wp/DuB7Cuw==", "wqV+wpPDvw==", "RcKhwq7CpQ==", "SsOAwrXDgQ==", "wqjDqcONIw==", "wovCncK5wok=", "YnAtw58=", "esKMW8O0", "EjjDkUU=", "wqDDvy3Cgw==", "wofDssKWwoA=", "asKVUQ0=", "w4TDhcOBw48=", "wr3DkMK3wpQ=", "6K+B5rKP6aqS6K2z", "VMKHw7cR", "YcKhwoXChg==", "w6/CjW3DsA==", "wovDhyMs", "DGAMw7A=", "DiPDr8Kz", "wq5Uwq1p", "MAfDiMKG", "d1hqwqc=", "GkAQw5o=", "w6RJasKS", "w7YQSBQ=", "AsKAbm4=", "ZnM4w7U=", "w47CmWLDhg==", "wp/DncK/wqc=", "w4gWIsOQ", "w6PCgsOsFA==", "e8KqVcKo", "wpTDoSc8", "w6rCk0DDiw==", "w7QUUBo=", "SMOUw5PDjQ==", "wpdRSTo="];

// var _0x15de = function (_0x292c6e, _0x588964) {
//   _0x292c6e = _0x292c6e - 0;
//   var _0x15de95 = _0x5889[_0x292c6e];
//   return _0x15de95;
// };


// function hash(_0x127c72) {
//   var _0x2979ec = {};

//   _0x2979ec[_0x15de("0x6e", "UPoh") + "x"] = function (_0x4b5cb3, _0xc8caba) {
//     return _0x4b5cb3 ^ _0xc8caba;
//   };

//   _0x2979ec[_0x15de("0xb5", "OJHt") + "y"] = function (_0x49b7ec, _0x36e2e6) {
//     return _0x49b7ec ^ _0x36e2e6;
//   };

//   _0x2979ec[_0x15de("0xb1", "Pidd") + "K"] = function (_0x1e30e1, _0x4b0b45) {
//     return _0x1e30e1 + _0x4b0b45;
//   };

//   _0x2979ec[_0x15de("0xb4", "Tad^") + "Q"] = function (_0x1e9684, _0x426c7e) {
//     return _0x1e9684 & _0x426c7e;
//   };

//   _0x2979ec[_0x15de("0x89", "$tO%") + "e"] = function (_0x52fb76, _0xdb609f) {
//     return _0x52fb76 & _0xdb609f;
//   };

//   _0x2979ec[_0x15de("0x62", "3v6k") + "L"] = function (_0x9d9e51, _0x59f548) {
//     return _0x9d9e51 >= _0x59f548;
//   };

//   _0x2979ec[_0x15de("0x58", "yUiM") + "r"] = function (_0x252c06, _0x2009f5) {
//     return _0x252c06 * _0x2009f5;
//   };

//   _0x2979ec[_0x15de("0x98", "R]iP") + "u"] = function (_0x4762f0, _0x2fedc1) {
//     return _0x4762f0 < _0x2fedc1;
//   };

//   _0x2979ec[_0x15de("0xa1", "NDcf") + "l"] = function (_0x1e4884, _0x54ee24) {
//     return _0x1e4884 < _0x54ee24;
//   };

//   _0x2979ec[_0x15de("0xc7", "R]iP") + "Q"] = function (_0x3483b4, _0x1183b1) {
//     return _0x3483b4 + _0x1183b1;
//   };

//   _0x2979ec[_0x15de("0xaf", "VnTc") + "J"] = function (_0x5e8419, _0x264d9c) {
//     return _0x5e8419 == _0x264d9c;
//   };

//   _0x2979ec[_0x15de("0x0", "RGDr") + "w"] = function (_0x205f80, _0x1dc91b) {
//     return _0x205f80(_0x1dc91b);
//   };

//   _0x2979ec[_0x15de("0x88", "Pidd") + "s"] = function (_0x5c9271, _0x2064c2) {
//     return _0x5c9271 + _0x2064c2;
//   };

//   _0x2979ec[_0x15de("0x9f", "68]o") + "W"] = function (_0x2d4ed4, _0x4aa529) {
//     return _0x2d4ed4 * _0x4aa529;
//   };

//   _0x2979ec[_0x15de("0x50", "Q62u") + "V"] = function (_0x5c4fec, _0x5cd149) {
//     return _0x5c4fec !== _0x5cd149;
//   };
// }
//     `;
//     let ast = parser.parse(jscode);
//     let local_plug = new BasePlug(
//         'Callexpression to return value',
//         visitor,
//         '函数调用返回值取代函数调用',
//     )
//     local_plug.handler(ast)
//     console.log('------------------')
//     console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
// }
// demo()