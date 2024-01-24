export default function Pagination({numberOfPages, handlePaginationClick}){
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