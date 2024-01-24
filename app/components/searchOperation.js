import { useState } from 'react';

export default function SearchOperation({handleSearch}){
    let [searchKeyword, setsearchKeyword] = useState("");
    return (
        <>
            <input onChange={(e)=>setsearchKeyword(e.target.value)} className="p-1 border border-black mt-3 ml-5" 
            placeholder="enter a keyword..." />
            <button className='p-1 text-white bg-green-900 hover:bg-green-500'
            onClick={ ()=>handleSearch(searchKeyword) }>Search</button>
        </>
    );
}