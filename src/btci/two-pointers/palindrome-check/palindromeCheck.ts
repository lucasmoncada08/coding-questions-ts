export function palindromeCheck(s: string): boolean {
  let start = 0;
  let end = s.length - 1;

  while (start <= end) {
    if (s[start] !== s[end]) return false;
    start++;
    end--;
  }

  return true;
}

// for (let i=0; i<s.length; i++) {
//         console.log(`startPointer: ${s[i]} | endPointer: ${endPointer}`);
//         if (i >= endPointer-i) {
//             // console.log('pointers meet');
//             return true;
//         }
//         if (s[i] !== s[endPointer-i]) {
//             // console.log("pointers not equal at some point");
//             return false;
//         }
//     }

// function logLengthAndMiddleCharOfString(s: string) {
//     const length = s.length;
//     console.log({s})
//     console.log({length});
//     console.log('midpoint: ' + Math.floor(length/2));
//     console.log('midpoint: ' + s[Math.floor(length/2)])
//     console.log(k)
// }

// const testStrings = ["a", "abc", "racecar", "test"];
// for (const str of testStrings) {
//     logLengthAndMiddleCharOfString(str);
// }
