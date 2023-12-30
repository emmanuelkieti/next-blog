import Link from 'next/link';
import Button from './button.js';
import { blogData } from '../data/blogData';

export default function HomePage(){
  let blogs = [];//this will change depending on search results
  let searchKeyword = '';
  let pageLinks = [];//for pagination
  let url = location.href;
  if(!url.includes('keyword')) {//homepage without search operation
    let pageNumber = url.slice(-1);
    if(pageNumber == '/') pageNumber = 1;
    blogs = blogData.slice((pageNumber-1)*3,3*pageNumber).map((elem)=>
    <article key={elem.slug}
      className='w-3/12 border border-black border-solid pb-3 mt-3.5 mb-3.5 ml-1 m-auto rounded-sm text-wrap'>
      <img src='nature.jpeg' alt='nature' 
      className='w-full'
      />
      <p className='pl-3'>{ elem.date }</p>

      <h3 className='font-bold pl-3'>
          {elem.title[0].toUpperCase()}{elem.title.slice(1,)}
      </h3>

      <p className='leading-tight pl-3'>
          {elem.content[0].toUpperCase()}{elem.content.slice(1,30)+'...'}
      </p>
      <br />

      <Link href = {elem.slug} className='m-3'><Button>See more</Button></Link>
    </article>);

    //homepage pagination. Each page will have 3 posts
    for(let i = 1; i <= Math.ceil(blogData.length/3); i++)
      pageLinks.push(<li className='inline m-3'><a href={"/?page="+i}>{i}</a></li>);

  } else {//homepage with search operation
    if(blogData.filter((elem)=>elem.content.toLowerCase().includes(url.slice(url.indexOf("=")+1).toLowerCase())).length == 0){
      return(
        <>
          <p className='m-3'>There is no post with such keyword yet</p>
          <a href="/"><Button>Back to Home page</Button></a>
        </>
      );
    } else {
      blogs = blogData.filter((elem)=>elem.content.toLowerCase().includes(url.slice(url.indexOf("=")+1).toLowerCase())).map(
        (elem)=>
      <article key={elem.slug}
        className='w-3/12 border border-black border-solid p-3 mt-3.5 mb-3.5 m-auto rounded-sm'>
        <img src='nature.jpeg' alt='nature' 
        className='w-100'/>
        <p>{ elem.date }</p>
  
        <h3 className='font-bold'>
            {elem.title[0].toUpperCase()}{elem.title.slice(1,)}
        </h3>
  
        <p className='leading-tight'>
            {elem.content[0].toUpperCase()}{elem.content.slice(1,30)+'...'}
        </p>
        <br />
  
        <Link href = {elem.slug}><Button>See more</Button></Link>
      </article>
      );
    }
    
  }
  
  return(
    <main>
      <div className='mb-3.5'>
        <h1 className='mt-5 mb-1 text-3xl font-bold text-center'>Nature Blog</h1>
        <p className='italic text-center'>This is a blog about different aspects of nature.</p>
        <hr />
        
        <input onChange={(e)=>searchKeyword = e.target.value} className="p-1 border border-black mt-3 ml-5" 
        placeholder="enter a keyword..." />
        <button className='p-1 text-white bg-green-900 hover:bg-green-500' onClick={function(){
          location.assign('/?keyword='+searchKeyword);
        }}>Search</button>
      </div>

      <div className='flex flex-row flex-wrap'>
        {blogs}
      </div>

      <div className='mt-5 ml-5'><ul>{pageLinks}</ul></div>
    </main>
  );
}