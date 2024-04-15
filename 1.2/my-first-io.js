let fs = require("fs")
let buf = fs.readFileSync(process.argv[2])
const str = buf.toString()
let lines = str.split('\n')
let result = lines.length - 1
console.log(result)
