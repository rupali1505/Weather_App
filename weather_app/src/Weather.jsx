import { useEffect, useState } from "react";

export default function Weather(){
    const [data,setData] = useState('');

    useEffect(()=>{
        const url = 'https://api.weatherapi.com/v1/current.json';
         fetch(url).then((res)=>res.json()).then((json)=>setData(json));
         console.log(data);
    },[])
    
}