const arr = [1, 2, [3, 4], [5, 6], 7]

function flatten(arr){
    return arr.flat(Infinity)
}
console.log(flatten(arr))