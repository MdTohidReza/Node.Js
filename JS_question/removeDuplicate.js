const num = [1, 2, 3, 4, 5, 1, 2, 3];

function removeDuplicate(num){
    return [...new Set(num)]
}
console.log(removeDuplicate(num));
