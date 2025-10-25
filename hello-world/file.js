const { notEqual } = require("assert");
const { error } = require("console");
const fs = require("fs");

const os = require('os')
console.log(os.cpus().length);


// // sync.... call Blocking...
// fs.writeFileSync('./test.txt','Hello World');
// console.log("1");
// const result = fs.readFileSync("contact.txt", "utf-8");
// console.log(result);
// console.log("2");

// // Async...call NOn-Blocking
// fs.writeFile("./text.txt","Hello Tohid",(error)=>{})
// console.log('1');
// fs.readFile('contact.txt', 'utf-8',(err, result)=>{
// console.log(result);
// });
// console.log('2');
// console.log("3");
// console.log("4");




// const result = fs.readFileSync("./contact.txt","utf-8")
// console.log(result);

// fs.readFile("./contact.txt","utf-8",(err,result)=>{
//     if (err) {
//         console.log("Error",err);
//     }
//     else{
//         console.log(result);
        
//     }
// })

// fs.appendFileSync("./text.txt",`${Date.now()}Hey Reza\n`);
// fs.cpSync("./text.txt","./copy.txt");
// fs.unlinkSync("./copy.txt")

//  console.log (fs.statSync("./text.txt"))



// Note
// Default thread pool size = 4
// max? 8core cpu = we can create max 8 thread