// we have to print
// ABC
// DEF
// GHI

const n = 3;
let ch = 'A';
for(let i =0; i<n; i++){
    for(let j =0; j<n; j++){
        process.stdout.write(ch + " ");
        ch = String.fromCharCode(ch.charCodeAt(0) + 1);
    }
    process.stdout.write("\n");
}