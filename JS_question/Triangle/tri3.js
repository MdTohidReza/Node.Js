const n = 4;
let num = 1;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < i + 1; j++) {
    process.stdout.write(num + " ");
    num++;
  }
  process.stdout.write("\n");
}

// output is
// 1
// 2 3
// 4 5 6
// 7 8 9 10