export default function Button({ children }){
  return(
    <button className='p-1.5 text-white bg-gray-500 hover:bg-black'>
      { children }
    </button>
  );
}