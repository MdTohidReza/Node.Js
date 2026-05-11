// we want to print
// ABCD
// ABCD
// ABCD
// ABCD

const n = 4;
for (let i = 0; i < n; i++) {
  let ch = "A";
  for (let j = 0; j < n; j++) {
    process.stdout.write(ch + " ");
    ch = String.fromCharCode(ch.charCodeAt(0) + 1);
  }
  process.stdout.write("\n");
}
