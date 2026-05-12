const num = [1,2,3,4,5]

//Filter
const evenNum = num.filter(n=>n%2===0)
console.log(evenNum);

//Map
const squareNum = num.map(n=>n*2)
console.log(squareNum);

//Reduce
const sum = num.reduce((acc, curr)=> acc+ curr, 0)
console.log(sum);

//Find
const findNum = num.find(n=> n>3)
console.log(findNum);

//Some
const hasEvenNum = num.some(n=> n%2===0)
console.log(hasEvenNum);

//Every
const allEvenNum = num.every(n=> n%2===0)
console.log(allEvenNum);

//Includes
const includesNum = num.includes(3)
console.log(includesNum);

//Sort
const sortedNum = num.sort((a,b)=> b-a)
console.log(sortedNum);

//Join
const joinedNum = num.join("-")
console.log(joinedNum);

//Slice
const slicedNum = num.slice(1,4)
console.log(slicedNum);

//Splice
const splicedNum = num.splice(2,2)
console.log(splicedNum);
console.log(num);

//Concat
const concatNum = num.concat([6,7,8])
console.log(concatNum);

//Reverse
const reversedNum = num.reverse()
console.log(reversedNum);

//forEach
num.forEach(n=> console.log(n));

//FindIndex
const findIndexNum = num.findIndex(n=> n===3)
console.log(findIndexNum);

//IndexOf
const indexOfNum = num.indexOf(3)
console.log(indexOfNum);

//LastIndexOf
const lastIndexOfNum = num.lastIndexOf(3)
console.log(lastIndexOfNum);

//Length
const lengthNum = num.length
console.log(lengthNum);

//IsArray
const isArrayNum = Array.isArray(num)
console.log(isArrayNum);

//Push
num.push(6)
console.log(num);

//Pop
const poppedNum = num.pop()
console.log(poppedNum);
console.log(num);

//Shift
const shiftedNum = num.shift()
console.log(shiftedNum);
console.log(num);

//Unshift
num.unshift(0)
console.log(num);


