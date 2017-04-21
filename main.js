const ZERO = p=>x=>x;
const ONE = p=>x=>p(x);
const TWO = p=>x=>p(p(x));
const THREE = p=>x=>p(p(p(x)));
const FIVE = p=>x=>p(p(p(p(p(x)))));

const INCREMENT = n=>(p=>x=>p(n(p)(x)));
const ADD = n=>m=>(n(INCREMENT)(m));
const MULTIPLY = n=>m=>(n(ADD(m))(ZERO));
const POWER = n=>m=>(m(MULTIPLY(n))(ONE));

const DECREMENT = n=>p=>x=>n(g=>h=>h(g(p)))(y=>x)(y=>y);
const SUBTRACT = n=>m=>(m(DECREMENT)(n));

const TRUE = x=>y=>x;
const FALSE = x=>y=>y;
const IF = b=>b;

const AND = a=>b=>a(b)(a);
const OR = a=>b=>a(a)(b);
const NOT = c=>a=>b=>c(b)(a); //Applicative Order
// const NOT = p=>p(FALSE)(TRUE);    //Normal Order
const XOR = a=>b=>a(NOT(b))(b);

const IS_ZERO = n=> n(x=>FALSE)(TRUE);

const LESS_THAN_OR_EQUAL = m=>n=>IS_ZERO(SUBTRACT(m)(n))
const GREATER_THAN = m=>n=>NOT(IS_ZERO(SUBTRACT(m)(n)))
const LESS_THAN = m=>n=>NOT(IS_ZERO(SUBTRACT(n)(m)))
const GREATER_THAN_OR_EQUAL = m=>n=>(IS_ZERO(SUBTRACT(n)(m)))


const Y = f=>(x=>f(x(x)))(x=>f(x(x)))
const Z = f=>(x=>f(y=>x(x)(y)))(x=>f(y=>x(x)(y)))

// const MODULO = (m)=>(n)=>IF(LESS_THAN_OR_EQUAL(n)(m))((x)=>MODULO(SUBTRACT(m)(n))(n)(x))(m); // cheating
const MODULO = Z(f=>m=>n=>IF(LESS_THAN_OR_EQUAL(n)(m))(x=>f(SUBTRACT(m)(n))(n)(x))(m))
const DIVIDE = Z(f=>m=>n=>IF(LESS_THAN_OR_EQUAL(n)(m))(x=>INCREMENT(f(SUBTRACT(m)(n))(n))(x))(ZERO))

const PAIR = x=>y=>f=>f(x)(y);
const LEFT = p=>p(x=>y=>x)
const RIGHT = p=>p(x=>y=>y)

const EMPTY = PAIR(TRUE)(TRUE);
const IS_EMPTY  = LEFT;

const UNSHIFT = l=>x=>PAIR(FALSE)(PAIR(x)(l))
const PUSH = l=>x=>FOLD(l)(UNSHIFT(EMPTY)(x))(UNSHIFT)

const FIRST = l=>LEFT(RIGHT(l))
const REST = l=>RIGHT(RIGHT(l))

const RANGE = Z(f=>m=>n=>IF(LESS_THAN(m)(n))(x=>UNSHIFT(f(INCREMENT(m))(n))(m)(x))(EMPTY))

const FOLD = Z(f=>l=>x=>g=>IF(IS_EMPTY(l))(x)(y=> g(f(REST(l))(x)(g))(FIRST(l))(y)))
const MAP = l=>f=>FOLD(l)(EMPTY)(k=>i=>UNSHIFT(k)(f(i)))

const TEN = MULTIPLY(TWO)(FIVE)
const HUNDRED = MULTIPLY(TEN)(TEN)

const NOT_PRIME=RANGE(TEN)(DECREMENT(ADD(TEN)(TEN)))

// const TO_DIGITS = N=>{
//     return PUSH(
//         IF(LESS_THAN(N)(TEN))
//         (EMPTY)
//         (x=>TO_DIGITS(DIVIDE(N)(TEN))(x)))
//     (MODULO(N)(TEN))
// }

const TO_DIGITS = Z(f=>N=>{
    return PUSH(
        IF(LESS_THAN(N)(TEN))
        (EMPTY)
        (x=>f(DIVIDE(N)(TEN))(x)))
    (MODULO(N)(TEN))
})

const isPrime = (N)=>{
    return FOLD(RANGE(TWO)(N))(TO_DIGITS(N))(acc=>n=>{
        return IF(IS_ZERO(MODULO(N)(n)))(NOT_PRIME)(acc)
    })
}

to_array(MAP(RANGE(TWO)(HUNDRED))(n=>isPrime(n)))
.forEach((b,i)=>{
    console.log(to_string(b));
})

function to_char(c) {
  return '0123456789NOT PRIME'.slice(to_integer(c), to_integer(c)+1)
}

function to_string(str) {
  return to_array(str).map(s=>to_char(s)).join("")
}

function to_boolean(b) {
    return b(true)(false)
}

function to_integer(n) {
    return n(x=>x+1)(0)
}

function to_array(l){
    var arr = [];
    while(!to_boolean(IS_EMPTY(l))) {
        arr.push(FIRST(l))
        l = REST(l);
    }
    return arr
}

module.exports = {
    "numbers":{
        ZERO:ZERO,
        ONE:ONE,
        TWO:TWO,
        THREE:THREE,
        FIVE:FIVE,
        TEN:TEN,
        HUNDRED:HUNDRED,
    },
    "math_op":{
        INCREMENT:INCREMENT,
        ADD:ADD,
        MULTIPLY:MULTIPLY,
        POWER:POWER,

        DECREMENT:DECREMENT,
        SUBTRACT:SUBTRACT,

        MODULO:MODULO,
        DIVIDE:DIVIDE
    },
    "boolean":{
        TRUE:TRUE,
        FALSE:FALSE,
    },
    "logic_op":{
        AND:AND,
        OR:OR,
        NOT:NOT,
        XOR:XOR,    
    },
    "comp_op":{
        IS_ZERO:IS_ZERO,
        LESS_THAN_OR_EQUAL:LESS_THAN_OR_EQUAL,
        GREATER_THAN:GREATER_THAN,
        LESS_THAN:LESS_THAN,
        GREATER_THAN_OR_EQUAL:GREATER_THAN_OR_EQUAL,
    },

    "list":{
        "PAIR":PAIR,
        "LEFT":LEFT,
        "RIGHT":RIGHT,

        "EMPTY":EMPTY,
        "IS_EMPTY":IS_EMPTY,

        "UNSHIFT":UNSHIFT,
        "FIRST":FIRST,
        "REST":REST,

        "RANGE":RANGE,
        "FOLD":FOLD,
        "MAP":MAP
    },

    isPrime:isPrime,
    to_boolean:to_boolean,
    to_integer:to_integer,
    to_array:to_array,
    to_string:to_string,
}