import React from 'react';

import { 
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';


const Paginations = (props) => {

    // use odd number for paging
    let pagingNumber = 5;
    let pages = Math.ceil(props.totalNumber / props.recordsPerPage);
    let paging = [];
    
    let x = Math.ceil(pagingNumber / 2);
    let y = Math.floor(pagingNumber / 2);

    // console.log(props, pages, x, y);
    
    if (props.pageId <= x || pages <= pagingNumber)
    {
        for(let i = 1; i <= Math.min(pages, pagingNumber); i++)
            paging.push(i);
    }
    else if (props.pageId > pages - x)
    {
        for(let i = pages - pagingNumber + 1; i <= pages; i++)
            paging.push(i);
    }
    else
    {
        for(let i = props.pageId - y; i <= props.pageId + y; i++)
            paging.push(i);
    }

    const onPageIdClick = pageId => props.setPageId(pageId);

    let paginationPrev = '';
    let paginationNext = '';

    if (props.pageId > 1)
        paginationPrev = <PaginationItem>
                <PaginationLink next onClick={() => onPageIdClick(props.pageId - 1) }>
                    <i className="fa fa-fw fa-angle-left"></i>
                </PaginationLink>   
            </PaginationItem>;

    if (props.pageId < pages)
        paginationNext = <PaginationItem>
                <PaginationLink next onClick={() => onPageIdClick(props.pageId + 1) }>
                    <i className="fa fa-fw fa-angle-right"></i>
                </PaginationLink>   
            </PaginationItem>;

    return (
        <Pagination aria-label="Page navigation example">
            {paginationPrev}
            {
                paging.map((p) =>  
                    {
                        if (p == props.pageId)
                        {
                            return <PaginationItem key={p} active>
                                <PaginationLink>
                                    {p}
                                </PaginationLink>
                            </PaginationItem>
                        }
                        
                        return <PaginationItem>
                                <PaginationLink key={p} onClick={() => onPageIdClick(p) }>
                                    {p}
                                </PaginationLink>
                            </PaginationItem>
                    }
                )
            }
            {paginationNext}            
        </Pagination>
    )
}

export { Paginations };
