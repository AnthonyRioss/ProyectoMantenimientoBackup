
export const formaterDinero=cantidad=>{
    return cantidad.toLocaleString("en-US",{
        style:"currency",
        currency:"USD",
    });
};
