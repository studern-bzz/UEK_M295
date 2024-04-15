let fs = require("fs")
let buf = fs.readFileSync(process.argv[2])
const str = buf.toString()
let rows = str.split('\n')
let result = rows.length - 1
console.log(result)
