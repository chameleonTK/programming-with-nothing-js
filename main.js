const ZERO = (p)=>(x)=>x;
const ONE = (p)=>(x)=>p(x);
const TWO = (p)=>(x)=>p(p(x));
const THREE = (p)=>(x)=>p(p(p(x)));

const INCREMENT = (n)=>((p)=>(x)=>p(n(p)(x)));
const ADD = (n)=>(m)=>(n(INCREMENT)(m));
const MULTIPLY = (n)=>(m)=>(n(ADD(m))(ZERO));
const POWER = (n)=>(m)=>(m(MULTIPLY(n))(ONE));

function to_integer(n) {
    return n((x)=>x+1)(0)
}

console.log("INCREMENT");
console.log(to_integer(INCREMENT(ZERO)));
console.log(to_integer(INCREMENT(ONE)));
console.log(to_integer(INCREMENT(TWO)));
console.log(to_integer(INCREMENT(THREE)));

console.log("OPERATIONS");
console.log("0+3 = "+to_integer(ADD(ZERO)(THREE)));
console.log("1+2 = "+to_integer(ADD(ONE)(TWO)));
console.log("2*3 = "+to_integer(MULTIPLY(TWO)(THREE)));
console.log("3^2 = "+to_integer(POWER(THREE)(TWO)));

