import Link from 'next/link';
import Button from "@/app/components/button";
import { blogData } from '@/app/data/blogData';

export default function Post({params}){
  const slug = params.slug;

  for(let x of blogData) 
    if(x.title == slug)
      return(
        <>
            <Link href="/" className='ml-3'><Button>Back to Home page</Button></Link>
            <div>
              <article className='mt-5 m-auto w-5/6'>
                <h1 className='font-bold'>{x.title[0].toUpperCase()}{x.title.slice(1)}</h1>
                <p>{x.date}</p>
                <p className='text-justify'>{x.content}</p>
              </article>
            </div>
        </>
      );
    return(
      <>
            <Link href="/"><Button>Back to Home page</Button></Link>
            <p>404, there is no such post yet.</p>
      </>
    );
}