function adder1(m, n) {
    return m+n
}

function adder2(m, n) {
    var carry = m & n;
    var result = m ^ n;
    while(carry != 0)
    {
        var shiftedcarry = carry << 1;
        carry = result & shiftedcarry;
        result ^= shiftedcarry;
    }
    return result
}


function adder3(a, b) {
    if(b == 0)
        return a;

    return adder3( a ^ b, (a & b) << 1);
}


for (var i=0; i<100; i++) {
    for (var j=0; j<100; j++) {
        if (!adder1(i, j)==adder3(i, j)) {
            console.log("Error");
        }
    }
}
