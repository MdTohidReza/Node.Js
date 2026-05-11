// we have to print
// 1234
// 1234
// 1234
// 1234


const n=4;
for(let i=0;i<n;i++){
    for(let j=1;j<=n;j++){
        process.stdout.write(j + " ")
    }
    process.stdout.write("\n")
}