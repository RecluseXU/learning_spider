// 自调用函数传入 Literal 实参时，Literal 实参转为函数内部定义，去除形参
const {BasePlug, types, parser, generator, traverse} = require("../../base");

const visitor = {
    "ExpressionStatement"(path){
		// IIFE检查
		if(!types.isIIFE(path)){return}
		// 仅有一个实参
		let callArguments = path.node.expression.arguments;
		if(callArguments.length !== 1){return}

		let argumentName = callArguments[0].name;

		// 存在兄长
		if(!path.inList || path.key == 0){return}
		// 兄长为变量声明
		let preSiblingPath = path.getPrevSibling();
		if(!types.isVariableDeclaration(preSiblingPath)){return}
		// 参数定义于兄长变量声明语句中
		let isArgumentIDExist = false;
		let arrayInitPath;
		for(let declarator of preSiblingPath.get('declarations')){
			if(!types.isVariableDeclarator(declarator)){continue}
			// 声明初始值为数组
			arrayInitPath = declarator.get('init');
			declarator = declarator.node;
			if(declarator.id.name === argumentName && types.isArrayExpression(declarator.init)){
				// 数组中的每个值都为Literal
				if(declarator.init.elements.every((element) => {return types.isLiteral(element)})){
					isArgumentIDExist = true;
					break;
				}
			}
		}
		if(!isArgumentIDExist){return}

		// 替换
		// 数组初始值替换自调用参数 
		let jsCode = '(function(){' + preSiblingPath.toString() + path.toString() + 'return ' + argumentName + '})()';
		
		try {
			const neoArray = eval(jsCode);
			arrayInitPath.replaceWithSourceString(JSON.stringify(neoArray));
			path.remove();
		} catch (error) {
			console.log('Fail to calculate Array init');
		}

	}
}

const plug = new BasePlug(
    'reinit_array_by_ifee',
    visitor,
    '将IFEE一次性修改 array 定义的结果直接赋值给定义，去除IFEE代码'
);
exports.default = plug;


// function demo() {
//     var jscode = `
//         var _0x5534 = ['UkRQY3Y=', 'c2NyaXA=', 'c2V0VGk=', 'bml1bQ==', 'RGF0YQ==', 'bmlyQno=', 'ZUV2ZW4=', 'ZWtkcmw=', 'ZENoaWw=', 'b3VNWEo=', 'aWdPUVY=', 'QmFIZWM=', 'aWNlY2E=', 'LmNvbQ==', 'ZjE3', 'ZjE1', 'UEpJT2Q=', 'bGVuZ3Q=', 'dGhlbl8=', 'c2VuZEQ=', 'cE54RHc=', 'R3hWbGk=', 'RXh6Tm8=', 'ZWxQS2Q=', 'Q1RPUg==', 'Oi8vbS4=', 'c2VuZA==', 'dERhdGE=', 'aW5uZXI=', 'UEFkdmM=', 'QW5kcm8=', 'OyBkb20=', 'cnNpb24=', 'bWRxaGU=', 'dUllckU=', 'bkdocks=', 'aXZlcg==', 'ZjI2', 'Ym9keQ==', 'fDEx', 'TUFLY2s=', 'bmV3IFM=', 'Z2VudA==', 'YlBsUUg=', 'SEFEelQ=', 'QWdlbnQ=', 'QWdka0M=', 'ZjEy', 'ZXJ0eQ==', 'dVFqaHo=', 'V2ViU2Q=', 'RW5RdVU=', 'cGxhdGY=', 'YWluPQ==', 'X19uaWc=', 'VGVxT20=', 'eW5Hdmg=', 'VHlwZQ==', 'cnhXWVY=', 'V2Vi', 'b3V0cHU=', 'aXJlcz0=', 'YXNzTmE=', 'VXVPZmQ=', 'a2VNcWI=', 'bWlzZQ==', 'bVlXcUs=', 'YmFpZHU=', 'aVJmaGE=', 'bF9TeW0=', 'Q3FYSXY=', 'M3w0fDU=', 'ZjQw', 'ZjM4', 'UmdIYm0=', 'ZWNvcmQ=', 'ZjM5', 'ZjE5', 'cnR5SXM=', 'V0R5Ylg=', 'Sk5OU2g=', 'RUVQR0U=', 'a1NKRWQ=', 'ZjI4', 'fDV8M3w=', 'WmdUaXY=', 'bWF0Y2g=', 'QWxs', 'a014Zkg=', 'ZjIy', 'cGVXS2o=', 'c2VhcmM=', 'ZGF0YUw=', 'ZjEz', 'IGFhcmM=', 'ZENvbGw=', 'T2xKcHQ=', 'd3poTHU=', 'RXZlbnQ=', 'Y01pUVU=', 'R2ZKbG0=', 'ZjM2', 'R2RNT28=', 'cHVzaA==', 'VEJMY28=', 'c3BpZGU=', 'Z2V0VGk=', 'ckpFTGc=', 'dE1zZw==', 'cmVTZWc=', 'WHVybWg=', 'SEtOc2w=', 'bGlFem4=', 'MnwxfDM=', 'RmlyZWY=', 'cWxkZHA=', 'Z2V0RGE=', 'WG9qalM=', 'TmVUc1o=', 'KCkgPT4=', 'Ym9s', 'ZG5wVUI=', 'alhjTmo=', 'ZW5ndGg=', 'a256Y28=', 'd2luZG8=', 'MXwy', 'Q2VETmE=', 'cig4KTs=', 'Vk9TdEc=', 'MHw0fDE=', 'QlliRkI=', 'M3w0fDY=', 'YXNuZmE=', 'bml1bV8=', 'fDB8NXw=', 'IGFybQ==', 'ZGVz', 'U2VtcHA=', 'dXRpbA==', 'ZjMy', 'YXJw', 'SHRpaEE=', 'fDR8MA==', 'aW5jbHU=', 'Y2RjX2E=', 'ZjM1', 'bWVTZWc=', 'c0pmdVQ=', 'cml0eVM=', 'YUpz', 'TGludXg=', 'QlRnYlI=', 'Y29kZWQ=', 'Sll2S1E=', 'cGx1Z2k=', 'TnRSRGM=', 'R3RJWng=', 'bmN1cnI=', 'Q2VmU2g=', 'aXBCdkU=', 'YXZpb3I=', 'dHBZa1I=', 'ZGVd', 'bmF2aWc=', 'blByb3A=', 'd3ZWanA=', 'aW5lZA==', 'Z2V0VmU=', 'cmVmZXI=', 'X19mbnI=', 'Z2lmeQ==', 'c0J5Q2w=', 'RnNRaWQ=', 'SURFX1I=', 'ZUVsZW0=', 'TmRhQ0g=', 'b0tsSGk=', 'ZnVuY3Q=', 'dG9fXw==', 'dFN0b3I=', 'Y29tL3M=', 'SFRNTA==', 'bG9naWM=', 'Nnw5fDA=', 'RW1hb2I=', 'dG9yLmI=', 'dnRrbFM=', 'X19fX3I=', 'cHJvZHU=', 'b25Xa2U=', 'bG9hZEM=', 'Q0FyUng=', 'YWRJZA==', 'aFJmSUE=', 'RkNkS0c=', 'ZFR0SXE=', 'akR2ZlU=', 'Mzg2NzE=', 'ZjIw', 'b3NjcHU=', 'ZmlsZXI=', 'T0JzZWc=', 'a1dYWGs=', 'dXZaSHM=', 'U3RhdGU=', 'cGVKYUg=', 'fDN8Mg==', 'aXNNb2I=', 'cGVybWk=', 'allGc1k=', 'TWFyaw==', 'bXZnc3k=', 'NXwxfDM=', 'UVdndU0=', 'TWNna1U=', 'eVd2WGQ=', 'VVFJWkU=', 'bmtTdkE=', 'a2hIblM=', 'X19zZWw=', 'ZmVhdHU=', 'c3VsdE4=', 'b3JtYXQ=', 'YWQtaW4=', 'dW5kZWY=', 'Y2xpY2s=', 'R2JCY1Y=', 'ZW50', 'ZWN0RGE=', 'YWlkdS4=', 'b2xsZWM=', 'TW9iaWw=', 'Vm9GQm8=', 'VURNR2Y=', 'dWNoUG8=', 'b3Jt', 'bG9nVXI=', 'Z2V0RWw=', 'cHJvcGU=', 'V2luMzI=', 'aHhuYnY=', 'aXNXaW4=', 'eWliVXA=', 'TWx2Qk4=', 'clNlZ20=', 'aD0v', 'WWR6Q2s=', 'c3Npb24=', 'Q2xFalE=', 'UER6d2w=', 'c3Jj', 'a0lOQk0=', 'Y29va2k=', 'eVBvQlA=', 'L2guZ2k=', 'bmRpZGE=', 'RW51bWU=', 'ZGVy', 'T3V0U2Q=', 'X3Vud3I=', 'anNob3M=', 'd21CTnE=', 'Z2V0RW4=', 'c2NyZWU=', 'bWVudE4=', 'ZWVkQ28=', 'd2ViZHI=', 'V2luZG8=', 'Nnwy', 'aXVIUGQ=', 'YWdlbnQ=', 'ZjI3', 'THF6QVA=', 'VG91Y2g=', 'Ni5qcw==', 'aWxl', 'cHlXcFY=', 'T2NJT04=', 'QnVmZmU=', 'ZjE2', 'am9pbg==', 'a2V5MlA=', 'b25lcnI=', 'REp1dUc=', 'aW1nRXI=', 'dS5jb20=', 'd1ZCZ0Y=', 'a3VwR2U=', 'YWVz', 'ZGVmZXI=', 'WENYWHU=', 'bF9BcnI=', 'U3RyaW4=', 'YXRpYy4=', 'YXJjaEE=', 'dXNlckE=', 'ZGVmaW4=', 'aGJ2U3U=', 'aGFudG8=', 'fDB8NHw=', 'bkxtQUQ=', 'ZjEw', 'aXNTZWE=', 'ZWxlbmk=', 'c2po', 'dG9y', 'S3JQYUg=', 'bXNJc1M=', 'Y2hyb20=', 'TVhYWkQ=', 'Ly9oZWM=', 'YWNjZXM=', 'UG9pbnQ=', 'bm5RRFI=', 'YWdlSW4=', 'bWVudA==', 'Y3REYXQ=', 'cmFuZG8=', 'aXNOZWU=', 'Q291bnQ=', 'ZjIz', 'MXwzfDU=', 'aW5kZXg=', 'UnB0UHQ=', 'NzZwZmM=', 'S1lPWUw=', 'c3BQdVA=', 'dHlwZQ==', 'MTg2NjE=', 'emtNdWU=', 'X3NlbGU=', 'aW9u', 'ZWdtZW4=', 'TlVYdEQ=', 'eWhZZ1M=', 'cVZqVVA=', 'TGlzdEY=', 'ZFBBTnE=', 'X3BoYW4=', 'eHJTamg=', 'ZjMw', 'RWdTbFM=', 'Z2V0RmU=', 'bF9Qcm8=', 'fDJ8MHw=', 'OyBwYXQ=', 'dGNfb24=', 'anVSQlE=', 'bXNtdGw=', 'ZjE0', 'Y29uY2E=', 'c3BsaXQ=', 'YXRvcg==', 'dXNpbmc=', 'c2V0SXQ=', 'ZjMz', 'NWYxYmE=', 'Q2NvSmM=', 'aVBob24=', 'ZG9RcG8=', 'd2Via2k=', 'UmVzaXo=', 'bGxlY3Q=', 'SGZTY3Y=', 'bmFtZQ==', 'TFVYREM=', 'YXBwZWQ=', 'Y2FsbFM=', 'TXBRdkU=', 'QkFfSEU=', 'R1psaFI=', 'Mnw2fDA=', 'VFJKWWY=', 'TWtLWUw=', 'TFV5Y0I=', 'WkxtY2Y=', 'QUlBbFM=', 'aGVpZ2g=', 'R1B4U08=', 'UUVUUkQ=', 'Z1lDS0g=', 'cVBoS2Q=', 'U0Z6WlA=', 'dHZoUEM=', 'ZXhlU2U=', 'ZW5pdW0=', 'cm9y', 'bXNXcmk=', 'aWtNTVk=', 'U2J5cXY=', 'ZW5jeQ==', 'RlFSRkQ=', 'TmJoWEc=', 'S0JLZ0Y=', 'V05MZWo=', 'Zmxvb3I=', 'ZjEx', 'fDh8NHw=', 'U2Zydkg=', 'aHRtYXI=', 'Z2V0', 'Wk5lTnE=', 'bXNNYXg=', 'aGFzT3c=', 'Q0pwT0c=', 'YXRh', 'c3VsdA==', 'TnlZb0E=', 'X1NlbGU=', 'TWFuYWc=', 'RFJOYnY=', 'bWF4VG8=', 'S0dYSEs=', 'a2R0UnA=', 'MTJ8Mnw=', 'aW5n', 'QmFpZHU=', 'Z2RxUUE=', 'cm9w', 'ZjIx', 'X19wcm8=', 'cHJvdG8=', 'cmVy', 'QlBjS1o=', 'ZjE4', 'SURTZ0E=', 'YXJlQ28=', 'aW50cw==', 'X2V2YWw=', 'YkNNeEE=', 'QkdHQ0w=', 'cm91bmQ=', 'YXBp', 'bmRDbGk=', 'QkJMY1Q=', 'ZjM0', 'aHd2dFY=', 'ZjI1', 'V2ViVmk=', 'SFFoVlg=', 'dFR4ZlU=', 'aURXTGE=', 'R1hhdVI=', 'dWF0ZQ==', 'dmtzcGM=', 'b2JwVkE=', 'TW1vT2I=', 'QmFSZ3Y=', 'Y3pJTng=', 'YVNlZ20=', 'ZGRf', 'cmFibGU=', 'aGFyZHc=', 'TG1YS08=', 'ZjI0', 'V2hxbXY=', 'eWRzcQ==', 'JnQ9', 'c1VVZEg=', 'RGJpSXU=', 'Z0NSVUs=', 'bnJaeG4=', 'YXBwZW4=', 'MTB8N3w=', 'd2lkdGg=', 'dHFnQ1Y=', 'end5eU8=', 'QXJyYXk=', 'bVBaeXk=', 'dG9TdHI=', 'dG9t', 'LmNvbS8=', 'cE93bmY=', 'ZG9jX28=', 'dHRlcl8=', 'OyBleHA=', 'd2JfanM=', 'c3RyaW4=', 'enNnaWg=', 'S2lqVWc=', 'dGVQcm8=', 'cmNoUmU=', 'aGFyZWQ=', 'bUlFTEs=', 'a2ZSWUU=', 'TG1JbG8=', 'cGFyc2U=', 'eXZHUUs=', 'dGF0aWM=', 'THpDZG8=', 'YWJ2aHQ=', 'WXNYdHM=', 'dG9yc3Q=', 'ZjM3', 'U2VnbWU=', 'X29iamU=', 'SVdNZ2Y=', 'd3BKZXg=', 'dHJrdkQ=', 'ZW1lbnQ=', 'X19sb28=', 'cG1lYWg=', 'dmVyc2k=', 'Z2V0UGE=', 'bEFqdXE=', 'ZG9jZm4=', 'SlNCZWg=', 'Uml6cEE=', 'Y2lQRmM=', 'RXJ1T1g=', 'ci1yZW4=', 'ZW5jcnk=', 'aFJlc3U=', 'ZjMx', 'dG9HTVQ=', 'Y2FsbFA=', 'LmJhaWQ=', 'cGNTZWE=', 'dmUgY28=', 'SVRCa1c=', 'bnVtUGU=', 'UndQdFo=', 'Zk5JRmk=', 'RE1WR3o=', 'ZjI5', 'Q010Ync=', 'dWVsQng=', 'VGFyZ2U=', 'bEttV1U=', 'VHpQbVg=', 'b1NjSUs=', 'anNFcnI=', 'W25hdGk=', 'YmNw', 'MXw0', 'SWJObUs=', 'Y3JlYXQ=', 'IGFybXY=', 'Y29sbGU=', 'QnpoeEg=', 'eXhGRHg='];

//         (function (_0x1d4248) {
// 			var _0x553400 = 222;
//             var _0x350641 = function (_0x4e0cde) {
//             while (--_0x4e0cde) {
//                 _0x1d4248['push'](_0x1d4248['shift']());
//             }
//             };

//             _0x350641(++_0x553400);
//         })(_0x5534);
//     `;
//     let ast = parser.parse(jscode);
//     plug.handler(ast)
//     console.log('------------------')
//     console.log(generator(ast)['code']);
// }
// demo()