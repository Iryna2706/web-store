import React from "react";
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { Pagination } from "react-bootstrap";
import  { useContext } from "react";


const Pages = observer(() => {
    const { product } = useContext(Context);
    const pagesCount = Math.ceil(product.totalCount / product.limit)
    const pages = []
    for (let i = 0; i < pagesCount; i++) {
        pages.push(i + 1)
    } 
    return (
        <Pagination className="mt-3">
            {pages.map(page => 
                <Pagination.Item key={page} active={product.page === page} onClick={() => product.setPage(page)}>
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;