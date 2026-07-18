import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import ProductList from "../components/ProductList";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { useEffect } from "react";
import { fetchTypes } from "../http/productAPI";
import { fetchBrands } from "../http/productAPI";
import { fetchProducts } from "../http/productAPI";
import Pages from "../components/pages";

const Shop = observer(() => {
  const { product } = React.useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data));
    fetchBrands().then((data) => product.setBrands(data));

    fetchProducts(null, null, 1, 3).then((data) => {
      product.setProduct(data.rows);
      product.setTotalCount(data.count);
    });
  }, [product]);

  useEffect(() => {
    fetchProducts(product.selectedType.id, product.selectedBrand.id, product.page, product.limit).then((data) => {
      product.setProduct(data.rows);
      product.setTotalCount(data.count);
    });
  }, [product.page, product.selectedType, product.selectedBrand, product.limit]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>

        <Col md={9}>
          <BrandBar />
          <ProductList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
