import { rejects } from "assert";
import { time } from "console";

function add( a: number  , b: number ){

    return a+b;
}


function times( n : number) : Promise<number>{

    let promise = new Promise<number>((resolve)=>{

        setTimeout((a:number)=>{

if (a==76){
    resolve(a);
}

        },n*1000 ,67 );
    })
    return promise;
}
console.log('Before promise');

let prom= times(5);

times(5).then(

    (result)=>{
        console.log("done" , result);
    }
).catch(
    ()=>{
        console.log("rejected");
    }
)

console.log("promise worked");

