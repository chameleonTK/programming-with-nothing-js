const ZERO = (p)=>(x)=>x;
const ONE = (p)=>(x)=>p(x);
const TWO = (p)=>(x)=>p(p(x));
const THREE = (p)=>(x)=>p(p(p(x)));
const FIVE = (p)=>(x)=>p(p(p(p(p(x)))));

const INCREMENT = (n)=>((p)=>(x)=>p(n(p)(x)));
const ADD = (n)=>(m)=>(n(INCREMENT)(m));
const MULTIPLY = (n)=>(m)=>(n(ADD(m))(ZERO));
const POWER = (n)=>(m)=>(m(MULTIPLY(n))(ONE));

const DECREMENT = (n)=>(p)=>(x)=>n((g)=>(h)=>h(g(p)))((y)=>x)((y)=>y);
const SUBTRACT = (n)=>(m)=>(m(DECREMENT)(n));

// const DECREMENT = function (n) {
//     return function(p){
//         return function(x){
//             return n(function(g){
//                 return function(h) {
//                     return h(g(p))
//                 }
//             })(function(y){
//                 return x;
//             })(function(y){
//                 return y;
//             })
//         }
//     }
// }


function to_integer(n) {
    return n((x)=>x+1)(0)
}

console.log("  ++0 \t==\t "+to_integer(INCREMENT(ZERO)));
console.log("  ++1 \t==\t "+to_integer(INCREMENT(ONE)));
console.log("  ++2 \t==\t "+to_integer(INCREMENT(TWO)));
console.log("  ++3 \t==\t "+to_integer(INCREMENT(THREE)));

console.log("  0+3 \t==\t "+to_integer(ADD(ZERO)(THREE)));
console.log("  1+2 \t==\t "+to_integer(ADD(ONE)(TWO)));
console.log("  2*3 \t==\t "+to_integer(MULTIPLY(TWO)(THREE)));
console.log("  3^2 \t==\t "+to_integer(POWER(THREE)(TWO)));

console.log("  --0 \t==\t "+to_integer(DECREMENT(ZERO))+" *");
console.log("  --1 \t==\t "+to_integer(DECREMENT(ONE)));
console.log("  --2 \t==\t "+to_integer(DECREMENT(TWO)));
console.log("  --3 \t==\t "+to_integer(DECREMENT(THREE)));

console.log("  5-3 \t==\t "+to_integer(SUBTRACT(FIVE)(THREE)));
console.log("  3-5 \t==\t "+to_integer(SUBTRACT(THREE)(FIVE))+" *");

console.log("\n* decrement(0) = 0;");

