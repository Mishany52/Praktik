var val=7;
var arr = [0, 2, 5, 10]
arr.reduce(function(a,c) {
  return Math.abs(a-val) < Math.abs(c-val) ? a: c;
})
console.log(arr)
