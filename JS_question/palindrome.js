const str = "MOM";

function IsPalindrome(str){
    const reverseString = str.split("").reverse().join("")
    return str === reverseString
}
console.log(str, IsPalindrome(str));
