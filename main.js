const zero = (p,x)=> x;
const one = (p,x)=> p(x);
const two = (p,x)=> p(p(x));
const three = (p,x)=> p(p(p(x)));


function to_integer(n) {
    return n((x)=>x+1,0)
}


console.log(to_integer(zero));
console.log(to_integer(one));
console.log(to_integer(two));
console.log(to_integer(three));
