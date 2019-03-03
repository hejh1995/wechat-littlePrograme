const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const random = function(n) {
  let res = ''
  // console.log(chars.length)
  for(let i = 0; i < n; i++) {
    // Math.ceil 向上舍入
    // Math.random() 产生0-1的随机数
    let id = Math.ceil(Math.random()*35)
    res+=chars[id]
  }
  return res
}
export {random}