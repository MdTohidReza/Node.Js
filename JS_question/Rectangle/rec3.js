// we have to print
// 123
// 456
// 789

const n = 3;
let num = 1;
for(let i=0; i<n; i++){
    for(let j=0;j<n;j++){
        process.stdout.write(num + " ")
        num++;
    }
    process.stdout.write("\n")
}