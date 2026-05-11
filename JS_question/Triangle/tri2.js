// we have to print
// 1
// 22
// 333
// 4444

const n = 4;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < i + 1; j++) {
    process.stdout.write(i + 1 + " ");
  }
  process.stdout.write("\n");
}
