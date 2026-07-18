import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import estrela from '../assets/estrela.png'
import { useNavigate } from "react-router-dom"
import { PRODUCT_ROUTE } from "../utils/consts";
import { API_BASE } from '../http/index'

const ProductItem = ({ product }) => {
    const navigate = useNavigate()
    return (
        <Col md={3} className="product-item" onClick={() => navigate(`${PRODUCT_ROUTE}/${product.id}`)}>
            <Card className="product-item__card">
                <Image width={150} height={150} src={
                    (() => {
                        const base = API_BASE.replace(/\/$/, '')
                        return product.img && product.img.startsWith('/') ? `${base}${product.img}` : `${base}/${product.img}`
                    })()
                } />
                <div className="product-item__info-header">
                    <div>{product.name}</div>
                    <div className="product-item__rating">
                        <span>{product.rating}</span>
                        <Image className="product-item__star" src={estrela} />
                    </div>
                </div>
            </Card>
        </Col>
    );
}

export default ProductItem;