def isPrime(p):
    for i in range(2,p):
        if p%i==0:
            return "Not Prime"
    return p
        

for i in range(100):
    print isPrime(i);