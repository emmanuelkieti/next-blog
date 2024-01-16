import Link from 'next/link';
import Button from './button.js';
import { blogData } from '../data/blogData';
import { useState } from 'react';

function SearchOperation({handleSearch}){
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

function Pagination({numberOfPages, handlePaginationClick}){
  let pageLinks = [];
  for(let i = 1; i <= numberOfPages; i++)
    pageLinks.push(<li key={i} className='inline m-3 cursor-pointer' 
    onClick={()=>handlePaginationClick(i)}>{i}</li>);
  return(
    <div className='mt-5 ml-5'>
      <ul>{pageLinks}</ul>
    </div>
  );
}

export default function HomePage(){
  const [searchWord, setsearchWord] = useState("");
  const [blogs, setBlogs] = useState(blogData);
  const [pageNumber, setpageNumber] = useState({ start: 0, end: 3});//use this for pagination

  const  handleSearch = (searchWord)=> {
    setsearchWord(searchWord);
    setBlogs(blogData.filter((element)=>element.content.toLowerCase().includes(searchWord.toLowerCase())));
  };

  const handlePaginationClick = (pageNumber)=> {setpageNumber({
    start: (pageNumber-1)*3,
    end: pageNumber*3
  });console.log(pageNumber)};

  
  let allBlogs;//use this variable to render blogposts
  if(!blogs.length){
    allBlogs = <p>No Blogs with {searchWord} as keyword yet.<a className='text-sky-500' href='/'> Go back to homepage</a></p>;
  } else {
    allBlogs = blogs.slice(pageNumber.start,pageNumber.end).map((element)=>
    <article key={element.slug}
      className='w-72 border border-black border-solid pb-3 mt-3.5 mb-3.5 ml-1 m-auto rounded-sm text-wrap'>
      <img src='nature.jpeg' alt='nature' 
        className='w-full'
      />
      <p className='pl-3'>{ element.date }</p>
      <h3 className='font-bold pl-3'>
        {element.title[0].toUpperCase()}{element.title.slice(1,)}
      </h3>
      <p className='leading-tight pl-3'>
        {element.content[0].toUpperCase()}{element.content.slice(1,30)+'...'}
      </p>
      <br />
      <Link href = {element.slug} className='m-3'><Button>See more</Button></Link>
    </article>);
  }

  return(
    <main>
      <div>
        <h1 className='mt-5 mb-1 text-3xl font-bold text-center'>Nature Blog</h1>
        <p className='italic text-center'>This is a blog about different aspects of nature.</p>
        <hr />

        <SearchOperation handleSearch={handleSearch} />
        
      </div>
      <div className='flex flex-row flex-wrap'>{ allBlogs }</div>

      <Pagination numberOfPages={Math.ceil(blogs.length/3)} handlePaginationClick={handlePaginationClick} />
    </main>
  );
}