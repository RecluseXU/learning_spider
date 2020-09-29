// 这是一段源代码，作用就是计算，输出一些字符
function test(){
  var i = [101, 102, 103, 104, 105, 106, 107];
  i[1] = i[1] + 1;
  output_str = [];
  for(var ind=0; ind < i.length; ind++){
  	output_str.push(String.fromCharCode(i[ind]))
  }
  return output_str
}
console.log(test().join(''))

