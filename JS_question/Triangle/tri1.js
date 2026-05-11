// we have to print
// *
// * *
// * * *
// * * * *

const n= 4;
for(let i=0; i<n; i++){
    for(let j=0; j<(i+1); j++){
        process.stdout.write("* ");
    }
    process.stdout.write("\n");
}
