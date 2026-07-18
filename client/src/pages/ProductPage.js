import React, { useEffect } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import starIcon from "../assets/estrela.png";
import { API_BASE } from '../http/index'
import { useParams } from "react-router-dom";
import { fetchOneProduct } from '../http/productAPI';

const ProductPage = () => {
    const [product, setProduct] = React.useState({info: []})
    const {id} = useParams()

    useEffect(() => {
      const loadProduct = async () => {
        try {
          const data = await fetchOneProduct(id)
          setProduct(data || { info: [] })
        } catch (error) {
          console.error('Erro ao carregar produto:', error)
        }
      }

      if (id) {
        loadProduct()
      }
    }, [id])

    const imageUrl = product.img
      ? (() => {
          const base = API_BASE.replace(/\/$/, '')
          return product.img.startsWith('/') ? `${base}${product.img}` : `${base}/${product.img}`
        })()
      : null

    return (
        <Container className="mt-3">
            <Row>
            <Col md={4}>
              <div className="d-flex flex-column m-3 align-items-center">
                {imageUrl ? (
                  <Image width={300} height={300} src={imageUrl} />
                ) : (
                  <div style={{ width: 300, height: 300, backgroundColor: '#e9ecef' }} />
                )}
                <h2 className="product-page-description-title mt-3">Características</h2>
                <div className="product-page-description mt-2">
                  {product.info.map(item => (
                    <div key={item.id} className="product-page-description-item">
                      <strong>{item.title}:</strong> {item.description}
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col md={4}>
            <Row className="product-page-header">
                <h2>{product.name}</h2>
                <div className="product-page-rating">
                    <div className="product-page-star-wrapper">
                        <img src={starIcon} alt="Star" className="product-page-star" />
                        <span className="product-page-rating-value">{product.rating}</span>
                    </div>
                </div>
            </Row>

            </Col>
            <Col md={4}>
            <Card className="product-page-card d-flex flex-column align-items-center justify-content-around">
                <h3>{product.price}€</h3>
                <Button variant={"outline-dark"}>Adicionar ao Carrinho</Button>
            </Card>

            </Col>
            </Row>
        </Container>
    );
}

export default ProductPage;