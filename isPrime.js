function range(start, target){
  if (target < start) {
    return [];
  } else {
    return Array.apply(0, Array(target-start))
      .map(function (element, index) { 
        return index + start;  
    });  
  }
} 

function isPrime(n){
  return range(2, n).reduce(function(acc, val){
    if (n%val==0){
      return "NOT PRIME";
    } else {
      return acc
    }
  }, n+"")
}

// range(2,100).forEach(function(n){
//   if (isPrime(n)!="NOT Prime"){
//     console.log(n);
//   }
// })


module.exports = {
    "isPrime":isPrime
}