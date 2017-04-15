const Zero = (p)=>(x)=>x;
const ONE = (p)=>(x)=>p(x);
const TWO = (p)=>(x)=>p(p(x));
const THREE = (p)=>(x)=>p(p(p(x)));