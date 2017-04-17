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

const TRUE = (x)=>(y)=>x;
const FALSE = (x)=>(y)=>y;
const IF = (b)=>b;

const AND = (a)=>(b)=>a(b)(a);
const OR = (a)=>(b)=>a(a)(b);
const NOT = (c)=>(a)=>(b)=>c(b)(a); //Applicative Order
// const NOT = (p)=>p(FALSE)(TRUE);    //Normal Order
const XOR = (a)=>(b)=>a(NOT(b))(b);

const IS_ZERO = (n)=> n((x)=>FALSE)(TRUE);

const LESS_THAN_OR_EQUAL = (m)=>(n)=>IS_ZERO(SUBTRACT(m)(n))
const GREATER_THAN = (m)=>(n)=>NOT(IS_ZERO(SUBTRACT(m)(n)))
const LESS_THAN = (m)=>(n)=>NOT(IS_ZERO(SUBTRACT(n)(m)))
const GREATER_THAN_OR_EQUAL = (m)=>(n)=>(IS_ZERO(SUBTRACT(n)(m)))

function to_boolean(b) {
    return b(true)(false)
}

function to_integer(n) {
    return n((x)=>x+1)(0)
}

console.log(to_boolean(IS_ZERO(ZERO)));
console.log(to_boolean(IS_ZERO(ONE)));
console.log(to_boolean(IS_ZERO(TWO)));
console.log(to_boolean(IS_ZERO(THREE)));

console.log(to_boolean(LESS_THAN_OR_EQUAL(ONE)(ONE)));
console.log(to_boolean(LESS_THAN_OR_EQUAL(THREE)(ONE)));
console.log(to_boolean(LESS_THAN_OR_EQUAL(TWO)(THREE)));

console.log(to_boolean(LESS_THAN(TWO)(THREE)));
console.log(to_boolean(LESS_THAN_OR_EQUAL(TWO)(THREE)));
console.log(to_boolean(GREATER_THAN(TWO)(THREE)));
console.log(to_boolean(GREATER_THAN_OR_EQUAL(TWO)(THREE)));

console.log(to_boolean(LESS_THAN(FIVE)(THREE)));
console.log(to_boolean(LESS_THAN_OR_EQUAL(FIVE)(THREE)));
console.log(to_boolean(GREATER_THAN(FIVE)(THREE)));
console.log(to_boolean(GREATER_THAN_OR_EQUAL(FIVE)(THREE)));